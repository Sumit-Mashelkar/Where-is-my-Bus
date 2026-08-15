//detailed view of selected buses, routes, stops and community updates
import React from 'react';
import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useParams } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

const BusDetailsPage = () => {
    const location = useLocation();
    const busDetails = location.state?.busDetails ?? [];

    //  const response = async () => {
    //             };

    // const {busId} = useParams();
    // console.log(`bus id: ${busId}`)
//console.log(`bus info ${busDetails}`)
  
    return (
        <>
            <Hero />
            <div>
                <h1>Bus Details</h1>
                {/* Add bus details content here */}
                
                
                <div>                
                    <p>Bus Number: {busDetails.bus_number}</p>
                    <p>From: {busDetails.from_city}</p>
                    <p>To: {busDetails.to_city}</p>
                    <p>Departure: {busDetails.departure}</p>
                </div>
              
            </div>
            <Footer />
        </>
    )
}

export default BusDetailsPage;