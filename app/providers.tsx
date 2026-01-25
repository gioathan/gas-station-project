"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RefineKbarProvider>
      <ConfigProvider>
        <AntdApp>
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
                    name: "hero_slides",
                    list: "/admin/hero-slides",
                    create: "/admin/hero-slides/create",
                    edit: "/admin/hero-slides/edit/:id",
                    meta: {
                    canDelete: true,
                    },
                },
                {
                  name: "promotions",
                  list: "/admin/promotions",
                  create: "/admin/promotions/create",
                  edit: "/admin/promotions/edit/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "values",
                  list: "/admin/values",
                  create: "/admin/values/create",
                  edit: "/admin/values/edit/:id",
                  meta: {
                    canDelete: true
                  },
                },
                ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            {children}
            <RefineKbar />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </RefineKbarProvider>
  );
}