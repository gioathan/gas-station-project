"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";

const { TextArea } = Input;

export default function ValueEdit() {
  const { formProps, saveButtonProps } = useForm({
    resource: "values",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Icon (Emoji)"
          name="icon"
          tooltip="Use an emoji like ⭐, 🤝, 🏆"
        >
          <Input placeholder="⭐" />
        </Form.Item>

        <Form.Item
          label="Order Index"
          name="order_index"
        >
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