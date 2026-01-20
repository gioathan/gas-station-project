"use client";

import { useTable, DeleteButton } from "@refinedev/antd";
import { Table, Space, Button, Tag, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";

export default function HeroSlidesList() {
  const { tableProps } = useTable({
    resource: "hero_slides",
    syncWithLocation: true,
  });
  
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const { data } = await supabaseClient
      .from("pages")
      .select("id, title")
      .order("title");
    
    if (data) setPages(data);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1>Hero Slides</h1>
        <Link href="/admin/hero-slides/create">
          <Button type="primary">Create New Slide</Button>
        </Link>
      </div>

      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="image_url"
          title="Image"
          render={(value) => <Image src={value} width={100} height={60} alt="slide" style={{ objectFit: "cover" }} />}
        />
        <Table.Column 
          dataIndex="page_id" 
          title="Page" 
          render={(pageId) => {
            const page = pages.find(p => p.id === pageId);
            return page?.title || "Unknown";
          }}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="subtitle" title="Subtitle" />
        <Table.Column dataIndex="order_index" title="Order" width={80} />
        <Table.Column 
          dataIndex="is_active" 
          title="Status" 
          render={(value) => value ? <Tag color="green">Active</Tag> : <Tag color="orange">Inactive</Tag>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <Link href={`/admin/hero-slides/edit/${record.id}`}>
                <Button icon={<EditOutlined />} size="small" />
              </Link>
              <DeleteButton 
                hideText 
                size="small" 
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}