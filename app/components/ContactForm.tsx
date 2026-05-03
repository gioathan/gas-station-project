"use client";

import { useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("error"));

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || t("error"));
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />

      <section style={{ background: "white", borderRadius: "16px", border: "2px solid #e0e0e0", padding: "clamp(20px, 5vw, 48px)", maxWidth: "700px", margin: "0 auto 80px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#DD1D21", marginBottom: "8px", textAlign: "center" }}>
          {t("title")}
        </h2>
        <p style={{ color: "#666", textAlign: "center", marginBottom: "40px", fontSize: "16px" }}>
          {t("subtitle")}
        </p>

        {status === "success" && (
          <div style={{ background: "#f0fdf4", border: "2px solid #22c55e", borderRadius: "12px", padding: "20px", marginBottom: "24px", textAlign: "center" }}>
            <p style={{ color: "#15803d", fontWeight: "600" }}>✓ {t("success")}</p>
          </div>
        )}

        {status === "error" && (
          <div style={{ background: "#fef2f2", border: "2px solid #fca5a5", borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", color: "#b91c1c", fontSize: "14px" }}>
            ✗ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="contact-form-grid">
            <div>
              <label style={{ display: "block", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px", fontSize: "14px" }}>
                {t("name")} <span style={{ color: "#DD1D21" }}>*</span>
              </label>
              <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t("namePlaceholder")} required />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px", fontSize: "14px" }}>
                {t("email")} <span style={{ color: "#DD1D21" }}>*</span>
              </label>
              <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px", fontSize: "14px" }}>
              {t("phone")} <span style={{ color: "#999", fontWeight: "400" }}>{t("optional")}</span>
            </label>
            <input style={inputStyle} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+30 210 000 0000" />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "600", color: "#1a1a1a", marginBottom: "6px", fontSize: "14px" }}>
              {t("message")} <span style={{ color: "#DD1D21" }}>*</span>
            </label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }} name="message" value={formData.message} onChange={handleChange} placeholder={t("messagePlaceholder")} required />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{ padding: "16px", background: status === "sending" ? "#999" : "#DD1D21", color: "white", border: "none", borderRadius: "8px", fontSize: "17px", fontWeight: "700", cursor: status === "sending" ? "not-allowed" : "pointer", transition: "background 0.2s", letterSpacing: "0.5px" }}
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>

          <p style={{ fontSize: "12px", color: "#999", textAlign: "center", margin: 0 }}>
            {t("recaptcha")}{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style={{ color: "#999" }}>{t("privacy")}</a>{" "}
            &{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener" style={{ color: "#999" }}>{t("termsLabel")}</a>{" "}
            {t("apply")}
          </p>
        </form>
      </section>
    </>
  );
}
