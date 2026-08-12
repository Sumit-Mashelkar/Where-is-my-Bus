import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const resultsStyle = {
    left: "30%",
    right: "30%",
    top: "200px",
    padding: "24px",
    transform: "translate(-50%, -50%)",
    background: "linear-gradient(135deg, #ffffff 0%, #f5f7fb 100%)",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    width: "min(92%, 440px)",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
    borderRadius: "42px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
};

const inputStyle = {
    position: "relative",
    width: "100%",
    backgroundColor: "#f8fafc",
    border: "1px solid #d9e2f0",
    borderRadius: "12px",
    padding: "12px 14px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
};

const Search = () => {
    const [fromInputValue, setFromInputValue] = useState("");
    const [toInputValue, setToInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!fromInputValue.trim() || !toInputValue.trim()) {
            setErrorMessage("Please enter both origin and destination.");
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: fromInputValue.trim(),
                    to: toInputValue.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error("Search request failed");
            }

            const data = await response.json();
            navigate("/resultsPage", {
                state: {
                    buses: data,
                    from: fromInputValue.trim(),
                    to: toInputValue.trim(),
                },
            });
        } catch (error) {
            console.error(error);
            setErrorMessage("Unable to fetch bus results. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            className="search"
            style={resultsStyle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="from-search-div">
                <input
                    className="from-input"
                    style={inputStyle}
                    type="text"
                    placeholder="starting from.."
                    value={fromInputValue}
                    onChange={(e) => setFromInputValue(e.target.value)}
                />
            </div>
            <div className="to-search-div">
                <input
                    className="to-input"
                    style={inputStyle}
                    type="text"
                    placeholder="going to.."
                    value={toInputValue}
                    onChange={(e) => setToInputValue(e.target.value)}
                />
            </div>

            {errorMessage && (
                <p style={{ color: "#dc2626", margin: "0 0 8px" }}>{errorMessage}</p>
            )}

            <button
                className="search-button"
                onClick={handleSearch}
                disabled={isLoading}
                style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
                    color: "#ffffff",
                    fontWeight: 600,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.18)",
                }}
            >
                {isLoading ? "Searching..." : "Find Buses"}
            </button>
        </motion.div>
    );
};

export default Search;
