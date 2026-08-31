// quick access menu
import { useNavigate } from "react-router-dom";

const CardStyles = {
    margin: "36px auto 90px",
    padding: "22px 20px",
    background: "linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.96) 100%)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "min(72%, 560px)",
    boxSizing: "border-box",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: "22px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.2)",
};

const titleStyle = {
    margin: "0 0 6px",
    color: "#f8fafc",
    fontSize: "18px",
    fontWeight: 700,
    textAlign: "left",
};

const subtitleStyle = {
    margin: "0 0 18px",
    color: "#cbd5e1",
    fontSize: "13px",
    textAlign: "left",
    letterSpacing: "0.2px",
};

const buttonRowStyle = {
    display: "flex",
    gap: "12px",
    width: "100%",
};

const iconStyles = {
    flex: 1,
    boxSizing: "border-box",
    borderRadius: "12px",
    padding: "14px 16px",
    margin: 0,
    color: "#f8fafc",
    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "14px",
    fontWeight: "700",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(37, 99, 235, 0.22)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const QuickAcess = () => {
    const Navigate = useNavigate();

    return (
        <div id="QuickAccessCard" style={CardStyles}>
            <h3 style={titleStyle}>Quick access</h3>
            <p style={subtitleStyle}>Manage routes and stay updated in one tap.</p>

            <div style={buttonRowStyle}>
                <button
                    style={iconStyles}
                    onClick={() => Navigate("/report-bus")}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 14px 28px rgba(37, 99, 235, 0.28)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 12px 22px rgba(37, 99, 235, 0.22)";
                    }}
                >
                    Report a Bus
                </button>

                <button
                    style={iconStyles}
                    onClick={() => Navigate("/add-route")}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 14px 28px rgba(37, 99, 235, 0.28)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 12px 22px rgba(37, 99, 235, 0.22)";
                    }}
                >
                    Add a Route
                </button>
            </div>
        </div>
    );
};

export default QuickAcess;


