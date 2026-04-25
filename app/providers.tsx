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
              },
              {
                name: "services",
              },
              {
                name: "promotions",
              },
              {
                name: "hero_slides",
              },
              {
                name: "values",
              },
              {
                name: "settings",
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