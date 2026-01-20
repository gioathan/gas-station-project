"use client";

import { supabaseClient } from "@/lib/supabase";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      flexDirection: "column",
      gap: "20px"
    }}>
      <h1>Admin Login</h1>
      <Button 
        type="primary" 
        icon={<GoogleOutlined />} 
        size="large"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
    </div>
  );
}