"use client";

import { useTable, DeleteButton } from "@refinedev/antd";
import { Table, Space, Button, Tag, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ServicesList() {
  const { tableProps } = useTable({
    resource: "services",
    syncWithLocation: true,
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1>Services</h1>
        <Link href="/admin/services/create">
          <Button type="primary">Create New Service</Button>
        </Link>
      </div>

      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="image"
          title="Image"
          render={(value) => value ? <Image src={value} width={50} height={50} alt="service" /> : "-"}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
          dataIndex="description" 
          title="Description" 
          render={(text) => text?.substring(0, 50) + "..."}
        />
        <Table.Column dataIndex="order_index" title="Order" />
        <Table.Column 
          dataIndex="is_active" 
          title="Status" 
          render={(value) => value ? <Tag color="green">Active</Tag> : <Tag>Inactive</Tag>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <Link href={`/admin/services/edit/${record.id}`}>
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