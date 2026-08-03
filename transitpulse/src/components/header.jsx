
//styles for the header and text
const headerStyles = {
  backgroundColor: "#ffffff",
  padding: "12px 20px",
  left: 0,
  right: 0,
  top: 0,
  height: "64px",
  position: "sticky",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  zIndex: 1000,
  boxShadow: "0 2px 8px rgba(16,24,40,0.06)",
  borderBottom: "1px solid rgba(16,24,40,0.04)",
  borderRadius: "0 0 22px 22px",
};

const textStyles = {
  color: "#0f172a",
  fontSize: "20px",
  fontWeight: 600,
  margin: 0,
  cursor: "pointer",
  fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  letterSpacing: "0.2px",
};



// Hero component
const Hero = () => {
  const heroText = "Transit Pulse";

  const handleClick = () => {
    // navigate to home
    window.location.href = "/";
  };

  return (
    <header className="center-text" style={headerStyles}>
      <h1 onClick={handleClick} style={textStyles}>
        {heroText}
      </h1>

      <button
        aria-label="Notifications"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          background: "#111827",
          color: "#fff",
          border: "none",
          padding: "8px",
          borderRadius: "8px",
          minWidth: "40px",
          minHeight: "40px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 2px rgba(2,6,23,0.2)",
        }}
      >
        🔔
      </button>
    </header>
  );
};

export default Hero;