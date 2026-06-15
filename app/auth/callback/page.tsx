"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";

const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

async function handleSession(email: string | undefined, router: ReturnType<typeof useRouter>) {
  if (!email || !allowedEmails.includes(email.toLowerCase())) {
    await supabaseClient.auth.signOut();
    router.replace("/login?error=unauthorized");
    return;
  }
  router.replace("/admin");
}

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleSession(session.user.email, router);
      }
    });

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) handleSession(session.user.email, router);
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
