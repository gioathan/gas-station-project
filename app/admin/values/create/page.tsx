"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Tabs } from "antd";

const { TextArea } = Input;

export default function ValueCreate() {
  const { formProps, saveButtonProps } = useForm({ resource: "values" });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
                  <Form.Item label="Title (English)" name="title_en">
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

        <Form.Item label="Icon (Emoji)" name="icon" tooltip="Use an emoji like ⭐, 🤝, 🏆">
          <Input placeholder="⭐" />
        </Form.Item>
        <Form.Item label="Order Index" name="order_index" initialValue={0}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Active" name="is_active" valuePropName="checked" initialValue={true}>
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
}
