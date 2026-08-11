import { useState } from "react";
import { motion } from "framer-motion";
import ResultsPage from "../pages/resultsPage.jsx";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import { Await } from "react-router-dom";


const resultsStyle = {
    left:"30%",
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
    const [showResults, setShowResults] = useState(false);

    const [fromInputValue, setFromInputValue] = useState("");
    const [toInputValue, setToInputValue] = useState("");

    const navigate = useNavigate();



    const handleSearch = async () => {
        // event.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/search", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      from: fromInputValue,
      to: toInputValue,
    }),
  });

 const data = await response.json();

setBuses(data);
};

    return (
        <motion.div
            className="search"
            style={resultsStyle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {!showResults ? (
                <>
                    <div className="from-search-div">
                    <input className="from-input" style={inputStyle}
                        type="text"
                        placeholder="starting from.."
                        value={fromInputValue}
                        onChange={(e) => setFromInputValue(e.target.value)}
                    />
                    </div>
                    <div className="to-search-div">
                    <input className="to-input" style={inputStyle}
                        type="text"
                        placeholder="going to.."
                        value={toInputValue}
                        onChange={(e) => setToInputValue(e.target.value)}
                    />
                    </div>
                    <button
                        className="search-button"
                        onClick={handleSearch}
                        style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "12px",
                            padding: "12px 14px",
                            background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
                            color: "#ffffff",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 8px 16px rgba(37, 99, 235, 0.18)",
                        }}
                    >
                        Find Buses
                    </button>
                </>
            ) : (
                <ResultsPage />
                
            )
            }
        </motion.div>
    );

     return (
    <div>

      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      />

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      />

      <button onClick={handleSearch}>
        Search
      </button>


      {/* Results */}

      <div>

        {buses.map((bus) => (
          <div key={bus.id}>

            <h3>
              Bus {bus.bus_number}
            </h3>

            <p>
              {bus.from_city} → {bus.to_city}
            </p>

            <p>
              Departure: {bus.departure}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};
};

export default Search;