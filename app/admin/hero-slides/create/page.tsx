"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Switch, InputNumber, Upload, Button, Select, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const { TextArea } = Input;

export default function HeroSlideCreate() {
  const { formProps, saveButtonProps } = useForm({ resource: "hero_slides" });
  const [uploading, setUploading] = useState(false);

  const { selectProps: pageSelectProps } = useSelect({
    resource: "pages",
    optionLabel: "title",
    optionValue: "id",
  });

  const handleImageUpload = async (file: any) => {
    setUploading(true);
    const sanitizedName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "").toLowerCase();
    const fileName = `${Date.now()}_${sanitizedName}`;
    const { error: storageError } = await supabaseClient.storage.from("megistanas").upload(fileName, file);
    if (storageError) { setUploading(false); return; }
    const { data: { publicUrl } } = supabaseClient.storage.from("megistanas").getPublicUrl(fileName);
    formProps.form?.setFieldsValue({ image_url: publicUrl });
    setUploading(false);
    return false;
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Page" name="page_id" rules={[{ required: true, message: "Please select a page" }]}>
          <Select {...pageSelectProps} placeholder="Select a page" />
        </Form.Item>

        <Form.Item label="Slide Image" required>
          <Upload beforeUpload={handleImageUpload} maxCount={1} listType="picture-card">
            <Button icon={<UploadOutlined />} loading={uploading}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="image_url" hidden rules={[{ required: true }]}><Input /></Form.Item>

        <Tabs
          items={[
            {
              key: "el",
              label: "🇬🇷 Greek",
              children: (
                <>
                  <Form.Item label="Slide Title (Greek)" name="title">
                    <Input placeholder="Κύρια επικεφαλίδα" />
                  </Form.Item>
                  <Form.Item label="Slide Subtitle (Greek)" name="subtitle">
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item label="CTA Button Text (Greek)" name="cta_text">
                    <Input placeholder="π.χ. Μάθετε Περισσότερα" />
                  </Form.Item>
                </>
              ),
            },
            {
              key: "en",
              label: "🇬🇧 English",
              children: (
                <>
                  <Form.Item label="Slide Title (English)" name="title_en">
                    <Input placeholder="Main heading" />
                  </Form.Item>
                  <Form.Item label="Slide Subtitle (English)" name="subtitle_en">
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item label="CTA Button Text (English)" name="cta_text_en">
                    <Input placeholder="e.g. Learn More" />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />

        <Form.Item label="CTA Button Link" name="cta_link">
          <Input placeholder="e.g. /services" />
        </Form.Item>

        <Form.Item label="Display Order" name="order_index" initialValue={0} help="Lower numbers appear first">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Active" name="is_active" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}
