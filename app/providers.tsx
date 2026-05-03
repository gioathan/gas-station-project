"use client";

import { Suspense } from "react";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { supabaseClient } from "@/lib/supabase";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RefineKbarProvider>
      <AntdApp>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#DD1D21",
              borderRadius: 8,
            },
          }}
        >
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            resources={[
              {
                name: "pages",
                list: "/admin/pages",
                create: "/admin/pages/create",
                edit: "/admin/pages/edit/:id",
              },
              {
                name: "services",
                list: "/admin/services",
                create: "/admin/services/create",
                edit: "/admin/services/edit/:id",
              },
              {
                name: "promotions",
                list: "/admin/promotions",
                create: "/admin/promotions/create",
                edit: "/admin/promotions/edit/:id",
              },
              {
                name: "hero_slides",
                list: "/admin/hero-slides",
                create: "/admin/hero-slides/create",
                edit: "/admin/hero-slides/edit/:id",
              },
              {
                name: "values",
                list: "/admin/values",
                create: "/admin/values/create",
                edit: "/admin/values/edit/:id",
              },
              {
                name: "settings",
                list: "/admin/settings",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Suspense fallback={null}>
              <RefineKbar />
            </Suspense>
            {children}
          </Refine>
        </ConfigProvider>
      </AntdApp>
    </RefineKbarProvider>
  );
}