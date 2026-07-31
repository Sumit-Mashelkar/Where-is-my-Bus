import { useState } from "react";
import ResultsPage from "./search-results.jsx";

const Search = () => {
    const [showResults, setShowResults] = useState(false);

    const handleSearch = () => {
        setShowResults(true);
    }

    return (
        <div className="search">
            {!showResults ? (
                <>
                    <input className="from"
                        type="text"
                        placeholder="starting from.."
                    />
                    <input className="to"
                        type="text"
                        placeholder="going to.."
                    />
                    <button className="search-button" onClick={handleSearch}>
                        find Buses
                    </button>
                </>
            ) : (
                <ResultsPage />  
            )
            }
        </div>
    );
};

export default Search;