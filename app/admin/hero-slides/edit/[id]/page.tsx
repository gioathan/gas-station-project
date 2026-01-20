"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Switch, InputNumber, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const { TextArea } = Input;

export default function HeroSlideEdit() {
  const { formProps, saveButtonProps } = useForm({
    resource: "hero_slides",
  });
  const [uploading, setUploading] = useState(false);

  const { selectProps: pageSelectProps } = useSelect({
    resource: "pages",
    optionLabel: "title",
    optionValue: "id",
  });

  const handleImageUpload = async (file: any) => {
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
      image_url: publicUrl
    });

    setUploading(false);
    return false;
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Page"
          name="page_id"
          rules={[{ required: true }]}
        >
          <Select {...pageSelectProps} />
        </Form.Item>

        <Form.Item label="Change Slide Image">
          <Upload 
            beforeUpload={handleImageUpload}
            maxCount={1}
            listType="picture-card"
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              Upload New Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item name="image_url" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Slide Title" name="title">
          <Input />
        </Form.Item>

        <Form.Item label="Slide Subtitle" name="subtitle">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label="CTA Button Text" name="cta_text">
          <Input />
        </Form.Item>

        <Form.Item label="CTA Button Link" name="cta_link">
          <Input />
        </Form.Item>

        <Form.Item label="Display Order" name="order_index">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Active"
          name="is_active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}