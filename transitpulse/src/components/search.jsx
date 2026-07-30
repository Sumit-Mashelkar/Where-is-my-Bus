// import { useState } from "react";
import ResultsPage from "./ResultsPage.jsx";

const Search = () => {


    const handleSearch = () => {
        ResultsPage();
    };


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
        </div>
    );
};

export default Search;