import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const resultsStyle = {
    position: "relative",
    margin: "100px auto 0",
    padding: "24px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(239,246,255,0.96) 100%)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
    width: "min(92%, 440px)",
    maxWidth: "440px",
    boxSizing: "border-box",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    borderRadius: "28px",
    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12)",
};

const inputStyle = {
    position: "relative",
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #dbeafe",
    borderRadius: "12px",
    padding: "12px 14px",
    color: "#0f172a",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    boxShadow: "inset 0 1px 2px rgba(148, 163, 184, 0.08)",
};

const Search = () => {
    const [fromInputValue, setFromInputValue] = useState("");
    const [toInputValue, setToInputValue] = useState("");
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const query = toInputValue.trim();
        if (!query) {
            return undefined;
        }

        const controller = new AbortController();

        const fetchDestinations = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/destinations?q=${encodeURIComponent(query)}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Destination request failed");
                }

                setDestinationSuggestions(await response.json());
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setDestinationSuggestions([]);
                }
            }
        };

        fetchDestinations();
        return () => controller.abort();
    }, [toInputValue]);

    const handleSearch = async () => {
        //handles edge case where user clicks search without entering both origin and destination
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
            <div className="to-search-div" style={{ position: "relative", width: "100%" }}>
                <input
                    className="to-input"
                    style={inputStyle}
                    type="text"
                    placeholder="going to.."
                    value={toInputValue}
                    onChange={(e) => {
                        setDestinationSuggestions([]);
                        setToInputValue(e.target.value);
                    }}
                />
                {destinationSuggestions.filter(
                    (destination) => destination.toLowerCase() !== toInputValue.trim().toLowerCase()
                ).length > 0 && (
                    <ul
                        role="listbox"
                        aria-label="Matching destinations"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            zIndex: 2,
                            margin: "4px 0 0",
                            padding: "4px",
                            listStyle: "none",
                            background: "#ffffff",
                            border: "1px solid #dbeafe",
                            borderRadius: "8px",
                            boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                        }}
                    >
                        {destinationSuggestions
                            .filter((destination) => destination.toLowerCase() !== toInputValue.trim().toLowerCase())
                            .map((destination) => (
                                <li key={destination} role="option" aria-selected="false">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setToInputValue(destination);
                                            setDestinationSuggestions([]);
                                        }}
                                        style={{
                                            width: "100%",
                                            padding: "9px 10px",
                                            border: 0,
                                            borderRadius: "4px",
                                            background: "transparent",
                                            color: "#0f172a",
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {destination}
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
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
                    background: "linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)",
                    color: "#ffffff",
                    fontWeight: 700,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    boxShadow: "0 12px 24px rgba(59, 130, 246, 0.28)",
                    letterSpacing: "0.2px",
                }}
            >
                {isLoading ? "Searching..." : "Find Buses"}
            </button>
        </motion.div>
    );
};

export default Search;
