"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, DatePicker, Upload, Button, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function PromotionEdit() {
  const { formProps, saveButtonProps } = useForm({ resource: "promotions" });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: any) => {
    setUploading(true);
    const sanitizedName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "").toLowerCase();
    const fileName = `${Date.now()}_${sanitizedName}`;
    const { error: storageError } = await supabaseClient.storage.from("megistanas").upload(fileName, file);
    if (storageError) { setUploading(false); return; }
    const { data: { publicUrl } } = supabaseClient.storage.from("megistanas").getPublicUrl(fileName);
    formProps.form?.setFieldsValue({ image: publicUrl });
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
                  <Form.Item label="Title (Greek)" name="title" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description (Greek)" name="description" rules={[{ required: true }]}>
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item label="Discount Text (Greek)" name="discount_text">
                    <Input placeholder="π.χ. 20% ΕΚΠΤΩΣΗ" />
                  </Form.Item>
                  <Form.Item label="Terms & Conditions (Greek)" name="terms">
                    <TextArea rows={6} />
                  </Form.Item>
                </>
              ),
            },
            {
              key: "en",
              label: "🇬🇧 English",
              children: (
                <>
                  <Form.Item label="Title (English)" name="title_en">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Description (English)" name="description_en">
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item label="Discount Text (English)" name="discount_text_en">
                    <Input placeholder="e.g. 20% OFF" />
                  </Form.Item>
                  <Form.Item label="Terms & Conditions (English)" name="terms_en">
                    <TextArea rows={6} />
                  </Form.Item>
                </>
              ),
            },
          ]}
        />

        <Form.Item label="Promotion Image">
          <Upload beforeUpload={handleImageUpload} maxCount={1}>
            <Button icon={<UploadOutlined />} loading={uploading}>Change Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="image" hidden><Input /></Form.Item>

        <Form.Item label="Valid From" name="valid_from" getValueProps={(v) => ({ value: v ? dayjs(v) : undefined })}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Valid Until" name="valid_until" getValueProps={(v) => ({ value: v ? dayjs(v) : undefined })}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Order Index" name="order_index">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Active" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}
