import { useState } from "react";


const Search = () => {
    const [showResults, setShowResults] = useState(false);

    const handleSearch = () => {
        setShowResults(true);
    }

    return (
        <div className="search">
            <input className="from" 
            type="text"
            placeholder="starting from.."
            ></input>
            <input className="to"
            type="text"
            placeholder="going to.."
            ></input>
            <button className="search-button" onClick={handleSearch}>
                find Buses
            </button>
            {showResults && <div className="result">Result page</div>}
        </div>
    );
};

export default Search;