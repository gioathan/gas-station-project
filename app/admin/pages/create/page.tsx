"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const { TextArea } = Input;

export default function PageCreate() {
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
      .from("megistanas")
      .upload(fileName, file);

    if (storageError) {
      console.error("Upload error:", storageError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabaseClient.storage
      .from("megistanas")
      .getPublicUrl(fileName);

    formProps.form?.setFieldsValue({
      [fieldName]: publicUrl
    });

    setUploading(false);
    return false;
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <h2>Basic Information</h2>
        
        <Form.Item
          label="Page Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g., About Us" />
        </Form.Item>

        <Form.Item
          label="Slug (URL)"
          name="slug"
          rules={[{ required: true }]}
          help="e.g., about-us (will be: yoursite.com/about-us)"
        >
          <Input placeholder="about-us" />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Hero Section</h2>

        <Form.Item
          label="Hero Title"
          name="hero_title"
        >
          <Input placeholder="Main heading on the page" />
        </Form.Item>

        <Form.Item
          label="Hero Subtitle"
          name="hero_subtitle"
        >
          <Input placeholder="Subheading text" />
        </Form.Item>

        <Form.Item label="Hero Image">
          <Upload 
            beforeUpload={(file) => handleImageUpload(file, "hero_image")} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload Hero Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item name="hero_image" hidden>
          <Input />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Content</h2>

        <Form.Item
          label="Page Content"
          name="content"
        >
          <TextArea rows={8} placeholder="Main content of the page" />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Call to Action</h2>

        <Form.Item
          label="CTA Button Text"
          name="cta_text"
        >
          <Input placeholder="e.g., Contact Us" />
        </Form.Item>

        <Form.Item
          label="CTA Button Link"
          name="cta_link"
        >
          <Input placeholder="e.g., /contact" />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>SEO Settings</h2>

        <Form.Item
          label="Meta Title (Browser Tab)"
          name="meta_title"
          help="50-60 characters recommended"
        >
          <Input placeholder="About Us | Shell Gas Station" maxLength={60} />
        </Form.Item>

        <Form.Item
          label="Meta Description (Google Search)"
          name="meta_description"
          help="150-160 characters recommended"
        >
          <TextArea rows={3} placeholder="Description that appears in Google search results" maxLength={160} />
        </Form.Item>

        <Form.Item
          label="Meta Keywords"
          name="meta_keywords"
        >
          <Input placeholder="gas station, fuel, shell, athens" />
        </Form.Item>

        <Form.Item label="OG Image (Social Media Share)">
          <Upload 
            beforeUpload={(file) => handleImageUpload(file, "og_image")} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload OG Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item name="og_image" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="OG Title (Social Media)"
          name="og_title"
        >
          <Input placeholder="Title when shared on Facebook/Twitter" />
        </Form.Item>

        <Form.Item
          label="OG Description (Social Media)"
          name="og_description"
        >
          <TextArea rows={2} placeholder="Description when shared on social media" />
        </Form.Item>

        <h2 style={{ marginTop: "32px" }}>Display Settings</h2>

        <Form.Item
          label="Show in Menu"
          name="show_in_menu"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Menu Order"
          name="menu_order"
          initialValue={0}
          help="Lower numbers appear first"
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Published"
          name="is_published"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}