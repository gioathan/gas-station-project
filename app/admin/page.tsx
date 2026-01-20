"use client";

import { Card, Col, Row, Statistic, Spin } from "antd";
import { FileOutlined, AppstoreOutlined, GiftOutlined, TagOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";

interface DashboardStats {
  totalPages: number;
  totalServices: number;
  activePromotions: number;
  totalHeroSlides: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    totalServices: 0,
    activePromotions: 0,
    totalHeroSlides: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get total pages
        const { count: pagesCount } = await supabaseClient
          .from("pages")
          .select("*", { count: "exact", head: true });

        // Get total services
        const { count: servicesCount } = await supabaseClient
          .from("services")
          .select("*", { count: "exact", head: true });

        // Get active promotions
        const { count: promotionsCount } = await supabaseClient
          .from("promotions")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true);

        // Get total hero slides
        const { count: heroSlidesCount } = await supabaseClient
          .from("hero_slides")
          .select("*", { count: "exact", head: true });

        setStats({
          totalPages: pagesCount || 0,
          totalServices: servicesCount || 0,
          activePromotions: promotionsCount || 0,
          totalHeroSlides: heroSlidesCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "24px" }}>Dashboard</h1>
      
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Total Pages" 
              value={stats.totalPages}
              prefix={<FileOutlined />}
              valueStyle={{ color: '#DD1D21' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Total Services" 
              value={stats.totalServices}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#DD1D21' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Active Promotions" 
              value={stats.activePromotions}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#DD1D21' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Hero Slides" 
              value={stats.totalHeroSlides}
              prefix={<TagOutlined />}
              valueStyle={{ color: '#DD1D21' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Quick Actions" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#666' }}>
              Welcome to your admin dashboard. Use the menu on the left to manage your website content.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}