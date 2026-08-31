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
                    <div className='route-summary'>
                        <div className='route-copy'>
                            <span className='route-label'>Trip</span>
                            <p>
                                Showing buses from <strong>{from}</strong> to <strong>{to}</strong>
                            </p>
                        </div>
                    </div>

                    <div className='filter-actions' aria-label='Filter and sort bus results'>
                        <button type='button' className='filter-pill active'>All</button>
                        <button type='button' className='filter-pill'>Fastest</button>
                        <button type='button' className='filter-pill'>Soonest</button>
                    </div>
                </section>
                  
                
                <div className="bus-list">
                    {buses.length > 0 ? (
                        buses.map((bus) => (
                            <div 
                            key={bus.id} 
                            className="bus-item"
                            onClick={() => handleBusItemClick(bus.id)}>
                                <div className='bus-topline'>
                                    <span className='bus-badge'>Bus {bus.bus_number}</span>
                                    <span className='bus-time'>{bus.departure}</span>
                                </div>

                                <div className='bus-route'>
                                    <div className='route-point'>
                                        <span className='dot start'></span>
                                        <span>{bus.from_city}</span>
                                    </div>
                                    <div className='route-line'></div>
                                    <div className='route-point'>
                                        <span className='dot end'></span>
                                        <span>{bus.to_city}</span>
                                    </div>
                                </div>

                                <div className='bus-meta'>
                                    <span>Departure</span>
                                    <strong>{bus.departure}</strong>
                                </div>
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

