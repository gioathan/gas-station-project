"use client";

import { useState, useEffect } from "react";
import { Card, Form, Input, Button, message, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { supabaseClient } from "@/lib/supabase";

const { TextArea } = Input;

export default function SettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from("settings")
      .select("*");

    if (error) {
      message.error("Failed to load settings");
      setLoading(false);
      return;
    }

    // Convert array to object for form
    const settingsObj: any = {};
    data?.forEach((setting: any) => {
      try {
        // Parse JSON value
        settingsObj[setting.key] = JSON.parse(setting.value);
      } catch (e) {
        // If not valid JSON, use as-is
        settingsObj[setting.key] = setting.value;
      }
    });

    form.setFieldsValue(settingsObj);
    setLoading(false);
  };

  const handleSave = async (values: any) => {
    setSaving(true);

    try {
      // Update each setting
      for (const [key, value] of Object.entries(values)) {
        const { error } = await supabaseClient
          .from("settings")
          .upsert({
            key,
            value: JSON.stringify(value),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: "key"
          });

        if (error) throw error;
      }

      message.success("Settings saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      message.error("Failed to save settings");
    }

    setSaving(false);
  };

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  return (
    <div>
      <h1>Site Settings</h1>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        style={{ maxWidth: "800px" }}
      >
        <Card title="Contact Information" style={{ marginBottom: "24px" }}>
          <Form.Item
            label="Phone Number"
            name="contact_phone"
            rules={[{ required: true }]}
          >
            <Input placeholder="210 123 4567" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="contact_email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="info@shellstation.gr" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="123 Main Street, Athens" />
          </Form.Item>
        </Card>

        <Card title="Business Hours" style={{ marginBottom: "24px" }}>
          <Form.Item
            label="Weekday Hours"
            name="hours_weekday"
            rules={[{ required: true }]}
          >
            <Input placeholder="Mon-Fri: 6:00 AM - 10:00 PM" />
          </Form.Item>

          <Form.Item
            label="Weekend Hours"
            name="hours_weekend"
            rules={[{ required: true }]}
          >
            <Input placeholder="Sat-Sun: 7:00 AM - 9:00 PM" />
          </Form.Item>
        </Card>

        <Card title="Map & Location" style={{ marginBottom: "24px" }}>
          <Form.Item
            label="Google Maps Embed URL"
            name="google_maps_embed"
            help="Get this from Google Maps > Share > Embed a map"
          >
            <TextArea rows={3} placeholder="https://www.google.com/maps/embed?pb=..." />
          </Form.Item>
        </Card>

        <Card title="Social Media" style={{ marginBottom: "24px" }}>
          <Form.Item
            label="Facebook URL"
            name="social_facebook"
          >
            <Input placeholder="https://facebook.com/yourpage" />
          </Form.Item>

          <Form.Item
            label="Instagram URL"
            name="social_instagram"
          >
            <Input placeholder="https://instagram.com/yourprofile" />
          </Form.Item>
        </Card>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<SaveOutlined />}
            loading={saving}
            size="large"
          >
            Save All Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}