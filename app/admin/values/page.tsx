"use client";

import { useTable, DeleteButton } from "@refinedev/antd";
import { Table, Space, Button, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ValuesList() {
  const { tableProps } = useTable({
    resource: "values",
    syncWithLocation: true,
    sorters: {
      initial: [{ field: "order_index", order: "asc" }],
    },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1>Company Values</h1>
        <Link href="/admin/values/create">
          <Button type="primary">Create New Value</Button>
        </Link>
      </div>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="order_index" title="Order" width={80} />
        <Table.Column 
          dataIndex="icon" 
          title="Icon" 
          render={(value) => <span style={{ fontSize: '24px' }}>{value}</span>}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          dataIndex="is_active"
          title="Status"
          render={(value) => value ? <Tag color="green">Active</Tag> : <Tag color="orange">Inactive</Tag>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <Link href={`/admin/values/edit/${record.id}`}>
                <Button icon={<EditOutlined />} size="small" />
              </Link>
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}