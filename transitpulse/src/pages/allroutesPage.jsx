// display  all routes

import React, { useState, useEffect } from 'react';
import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const AllRoutesPage = () => {
    const [routes, setRoutes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/allRoutes');
                if (!response.ok) {
                    throw new Error('Failed to fetch routes');
                }

                const data = await response.json();
                setRoutes(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching routes:', error);
                setRoutes([]);
            } finally {
                setIsLoading(false);
            }
        };

        run();
    }, []);

    return (
        <>
            <Hero />
            <p>all bus details</p>

            {isLoading ? (
                <p>Loading routes...</p>
            ) : (
                routes.map((bus) => (
                    <div key={bus.id}>
                        <p>{bus.id}</p>
                        <p>{bus.bus_number}</p>
                        <div>From: {bus.from_city}</div>
                        <div>To: {bus.to_city}</div>
                        <div>Departure: {bus.departure}</div>
                    </div>
                ))
            )}
            <Footer />
        </>
    );
};

export default AllRoutesPage;