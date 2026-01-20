"use client";

import { useTable, DeleteButton } from "@refinedev/antd";
import { Table, Space, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";

export default function PromotionsList() {
  const { tableProps } = useTable({
    resource: "promotions",
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "order_index",
          order: "asc",
        },
      ],
    },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1>Promotions</h1>
        <Link href="/admin/promotions/create">
          <Button type="primary">Create New Promotion</Button>
        </Link>
      </div>

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="order_index" title="Order" width={80} />
        
        <Table.Column dataIndex="title" title="Title" />
        
        <Table.Column 
          dataIndex="discount_text" 
          title="Discount" 
          render={(value) => (
            value ? (
              <span style={{ 
                background: '#DD1D21', 
                color: '#FBCE07', 
                padding: '4px 12px', 
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {value}
              </span>
            ) : '-'
          )}
        />
        
        <Table.Column
          dataIndex="valid_from"
          title="Valid From"
          render={(value) => value ? dayjs(value).format('MMM DD, YYYY') : '-'}
        />
        
        <Table.Column
          dataIndex="valid_until"
          title="Valid Until"
          render={(value) => value ? dayjs(value).format('MMM DD, YYYY') : '-'}
        />
        
        <Table.Column
          dataIndex="is_active"
          title="Status"
          render={(value) => value ? <Tag color="green">Active</Tag> : <Tag color="orange">Inactive</Tag>}
        />

        <Table.Column
          title="Actions"
          render={(_, record: any) => (
            <Space>
              <Link href={`/admin/promotions/edit/${record.id}`}>
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