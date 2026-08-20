import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useState } from 'react';

const busInfoStyles = {
   
}
const ResultsPage = () => {
    const location = useLocation();
    const buses = location.state?.buses ?? [];
    const from = location.state?.from ?? "";
    const to = location.state?.to ?? "";


    const navigate = useNavigate();

    const handleBusItemClick =  (busId) => {
        // Handle the click event for a bus item
        console.log("Bus item clicked:", busId);

         navigate(`/BusDetail/${busId}`)

}

    return (
        <>
            <Hero />
            <div className="results-page">
                
                <section className='filter-sort'>
                      <div>
                        <p>
                        Showing buses from <strong>{from}</strong> to <strong>{to}</strong>
                        </p>
                        <button>all</button>
                      </div>
                </section>
                  
                
                <div className="bus-list">
                    {buses.length > 0 ? (
                        buses.map((bus) => (
                            <div 
                            key={bus.id} 
                            className="bus-item"
                            onClick={() => handleBusItemClick(bus.id)}>
                                <section className='busInfo' style={busInfoStyles}>Bus Number: {bus.bus_number}</section>
                                <section className='busInfo' style={busInfoStyles}>From: {bus.from_city}</section>
                                <section className='busInfo' style={busInfoStyles}>To: {bus.to_city}</section>
                                <section className='busInfo' style={busInfoStyles}>Departure: {bus.departure}</section>
                            </div>
                        ))
                    ) : (
                        <p>No buses found. Please try another route.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResultsPage;

