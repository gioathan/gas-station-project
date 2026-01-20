"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const { TextArea } = Input;

export default function PageEdit() {
  const { formProps, saveButtonProps } = useForm({
    resource: "pages",
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: any, fieldName: string) => {
    setUploading(true);
    
    const sanitizedName = file.name
      .replace(/\s+/g, '_')
      .replace(/[^\w.-]/g, '')
      .toLowerCase();
    
    const fileName = `${Date.now()}_${sanitizedName}`;
    
    const { error: storageError } = await supabaseClient.storage
      .from("images")
      .upload(fileName, file);

    if (storageError) {
      console.error("Upload error:", storageError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabaseClient.storage
      .from("images")
      .getPublicUrl(fileName);

    formProps.form?.setFieldsValue({
      [fieldName]: publicUrl
    });

    setUploading(false);
    return false;
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <h2>Basic Information</h2>
        
        <Form.Item
          label="Page Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug (URL)"
          name="slug"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Hero Section</h2>

        <Form.Item label="Hero Title" name="hero_title">
          <Input />
        </Form.Item>

        <Form.Item label="Hero Subtitle" name="hero_subtitle">
          <Input />
        </Form.Item>

        <Form.Item label="Hero Image">
          <Upload 
            beforeUpload={(file) => handleImageUpload(file, "hero_image")} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Change Hero Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item name="hero_image" hidden>
          <Input />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Content</h2>

        <Form.Item label="Page Content" name="content">
          <TextArea rows={8} />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Call to Action</h2>

        <Form.Item label="CTA Button Text" name="cta_text">
          <Input />
        </Form.Item>

        <Form.Item label="CTA Button Link" name="cta_link">
          <Input />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>SEO Settings</h2>

        <Form.Item label="Meta Title" name="meta_title">
          <Input maxLength={60} />
        </Form.Item>

        <Form.Item label="Meta Description" name="meta_description">
          <TextArea rows={3} maxLength={160} />
        </Form.Item>

        <Form.Item label="Meta Keywords" name="meta_keywords">
          <Input />
        </Form.Item>

        <Form.Item label="OG Image">
          <Upload 
            beforeUpload={(file) => handleImageUpload(file, "og_image")} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Change OG Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item name="og_image" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="OG Title" name="og_title">
          <Input />
        </Form.Item>

        <Form.Item label="OG Description" name="og_description">
          <TextArea rows={2} />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Display Settings</h2>

        <Form.Item
          label="Show in Menu"
          name="show_in_menu"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label="Menu Order" name="menu_order">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}