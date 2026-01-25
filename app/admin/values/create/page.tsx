"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch } from "antd";

const { TextArea } = Input;

export default function ValueCreate() {
  const { formProps, saveButtonProps } = useForm({
    resource: "values",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          initialValue={0}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          label="Active"
          name="is_active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}