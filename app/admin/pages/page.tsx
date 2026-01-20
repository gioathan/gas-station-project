"use client";

import { useTable, DeleteButton } from "@refinedev/antd";
import { Table, Space, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function PagesList() {
  const { tableProps } = useTable({
    resource: "pages",
    syncWithLocation: true,
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1>Pages</h1>
        <Link href="/admin/pages/create">
          <Button type="primary">Create New Page</Button>
        </Link>
      </div>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column 
          dataIndex="show_in_menu" 
          title="In Menu" 
          render={(value) => value ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>}
        />
        <Table.Column dataIndex="menu_order" title="Order" />
        <Table.Column 
          dataIndex="is_published" 
          title="Status" 
          render={(value) => value ? <Tag color="green">Published</Tag> : <Tag color="orange">Draft</Tag>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <Link href={`/admin/pages/edit/${record.id}`}>
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