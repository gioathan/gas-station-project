"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, InputNumber, Upload, Button, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";

const { TextArea } = Input;

export default function ServiceEdit() {
  const { formProps, saveButtonProps } = useForm({ resource: "services" });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: any, fieldName: string) => {
    setUploading(true);
    const sanitizedName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "").toLowerCase();
    const fileName = `${Date.now()}_${sanitizedName}`;
    const { error: storageError } = await supabaseClient.storage.from("megistanas").upload(fileName, file);
    if (storageError) { setUploading(false); return; }
    const { data: { publicUrl } } = supabaseClient.storage.from("megistanas").getPublicUrl(fileName);
    formProps.form?.setFieldsValue({ [fieldName]: publicUrl });
    setUploading(false);
    return false;
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Tabs
          items={[
            {
              key: "el",
              label: "🇬🇷 Greek",
              children: (
                <>
                  <Form.Item label="Service Title (Greek)" name="title" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description (Greek)" name="description">
                    <TextArea rows={4} />
                  </Form.Item>
                </>
              ),
            },
            {
              key: "en",
              label: "🇬🇧 English",
              children: (
                <>
                  <Form.Item label="Service Title (English)" name="title_en">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description (English)" name="description_en">
                    <TextArea rows={4} />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />

        <Form.Item label="Icon" name="icon">
          <Input />
        </Form.Item>

        <Form.Item label="Service Image">
          <Upload beforeUpload={(file) => handleImageUpload(file, "image")} maxCount={1}>
            <Button icon={<UploadOutlined />} loading={uploading}>Change Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="image" hidden><Input /></Form.Item>

        <Form.Item label="Display Order" name="order_index">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Active" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}
