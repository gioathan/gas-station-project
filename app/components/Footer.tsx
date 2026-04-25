interface FooterProps {
  settings: any;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer style={{
      background: "#1a1a1a",
      color: "white",
      padding: "48px 24px",
      marginTop: "80px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "32px"
      }}>
        <div>
          <h3 style={{ color: "#FBCE07", marginBottom: "16px" }}>Contact Us</h3>
          <p style={{ margin: "8px 0" }}>📞 {settings.contact_phone}</p>
          <p style={{ margin: "8px 0" }}>✉️ {settings.contact_email}</p>
          <p style={{ margin: "8px 0" }}>📍 {settings.address}</p>
        </div>
        
        <div>
          <h3 style={{ color: "#FBCE07", marginBottom: "16px" }}>Hours</h3>
          <p style={{ margin: "8px 0" }}>{settings.hours_weekday}</p>
          <p style={{ margin: "8px 0" }}>{settings.hours_weekend}</p>
        </div>
        
        <div>
          <h3 style={{ color: "#FBCE07", marginBottom: "16px" }}>Follow Us</h3>
          {settings.social_facebook && (
            <a href={settings.social_facebook} style={{ display: "block", color: "white", margin: "8px 0" }}>
              Facebook
            </a>
          )}
          {settings.social_instagram && (
            <a href={settings.social_instagram} style={{ display: "block", color: "white", margin: "8px 0" }}>
              Instagram
            </a>
          )}
        </div>
      </div>
      
      <div style={{
        maxWidth: "1200px",
        margin: "32px auto 0",
        paddingTop: "24px",
        borderTop: "1px solid #333",
        textAlign: "center",
        color: "#888"
      }}>
        © {new Date().getFullYear()} X Petroleum. All rights reserved.
      </div>
    </footer>
  );
}