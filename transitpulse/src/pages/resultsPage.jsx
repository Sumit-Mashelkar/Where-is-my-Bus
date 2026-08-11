import Hero from '../components/header.jsx'
import Footer from '../components/footer.jsx'
// import { useLocation } from 'react-router-dom';
import { useState } from 'react';



const ResultsPage = () => {
    const [buses, setBuses] = useState([]);

    return (
        <>
        
        <Hero/>
        <div className="results-page">
            <h1>Results Page</h1>
            <div className="bus-list">
                {buses.length > 0 ? (
                    buses.map((bus, index) => (
                        <div key={index} className="bus-item">
                            <p>Bus Number: {bus.bus_number}</p>
                            <p>From: {bus.from_city}</p>
                            <p>To: {bus.to_city}</p>
                            <p>Departure: {bus.departure}</p>
                        </div>
                    ))
                ) : (
                    <p>No buses found.</p>
                )}
            </div>
        </div>
        <Footer/>
        </>       
    );
};

export default ResultsPage;

