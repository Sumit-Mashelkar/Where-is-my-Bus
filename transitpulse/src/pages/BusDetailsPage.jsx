//detailed view of selected buses, routes, stops and community updates
import React, { useState, useEffect } from 'react';
import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { Navigate, useLocation, useParams } from 'react-router-dom';

const BusDetailsPage =  () => {
    
    const [busDetails, setBusDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
 
    
	//fetch bus ID from URL
    const {busId} = useParams()
    console.log(`busId fetched from busdetails page: ${busId}`);
    
    
    useEffect(() => {
        const run = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://127.0.0.1:5000/BusDetails/${busId}`);
                if (!response.ok) {
                    console.error('Fetch failed', response.status);
                    setBusDetails(null);
                    return;
                }
                const data = await response.json();
                setBusDetails(data);
            } catch (err) {
                console.error('error encountered while fetching data', err);
                setBusDetails(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (busId) run();
    }, [busId]);
    
    return(
            <>
                <Hero />
                <div>
                <h1>Bus Details</h1>
                {isLoading && (
                    <p>loading bus details...</p>
                )}

                {!isLoading && !busDetails && (
                    <p>No bus details available.</p>
                )}

                {!isLoading && busDetails && (
                    <div className='busDetails'>
                        <div className='busName'>Bus Name: {busDetails.bus_Number}</div>
                        <div className='from'>From: {busDetails.from_city}</div>
                        <div>To: {busDetails.to_city}</div>
                        <div>Departure: {busDetails.departure}</div>
                    </div>
                )}
            </div>
           <Footer />
            </>
        )
       

}


export default BusDetailsPage;