import { supabaseClient } from "./supabase";
import sharp from 'sharp';

export async function uploadImage(file: File): Promise<string | null> {
  // Sanitize filename
  const sanitizedName = file.name
    .replace(/\s+/g, '_')
    .replace(/[^\w.-]/g, '')
    .toLowerCase()
    .replace(/\.(png|jpg|jpeg)$/i, '.webp'); // Force WebP
  
  const fileName = `${Date.now()}_${sanitizedName}`;
  
  // Convert to WebP and compress
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const compressedBuffer = await sharp(buffer)
    .resize(1200, null, { // Max width 1200px
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 80 }) // 80% quality WebP
    .toBuffer();
  
  const { error } = await supabaseClient.storage
    .from("images")
    .upload(fileName, compressedBuffer, {
      contentType: 'image/webp'
    });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const { data: { publicUrl } } = supabaseClient.storage
    .from("images")
    .getPublicUrl(fileName);

  return publicUrl;
}