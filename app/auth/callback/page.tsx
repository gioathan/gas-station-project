"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Supabase client reads the #access_token hash and sets the session automatically.
    // Wait for SIGNED_IN then forward to admin.
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.replace("/admin");
      }
    });

    // In case session is already available (hash processed before this effect ran)
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace("/admin");
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#ededed",
      fontFamily: "'Inter', sans-serif",
      fontSize: "16px",
    }}>
      Authenticating…
    </div>
  );
}
