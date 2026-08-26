//detailed view of selected buses, routes, stops and community updates
import { useState, useEffect } from 'react';
import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useParams } from 'react-router-dom';

const BusDetailsPage =  () => {
    
    const [busDetails, setBusDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
 
    
	//fetch bus ID from URL
    const {busId} = useParams()
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
                    <main className='bus-report'>
                        <section className='bus-report__summary'>
                            <div>
                                <p className='bus-report__eyebrow'>Selected bus</p>
                                <h2>Bus {busDetails.bus_number}</h2>
                                <p className='bus-report__journey'>
                                    {busDetails.from_city} <span aria-hidden='true'>-&gt;</span> {busDetails.to_city}
                                </p>
                            </div>
                            <div className='bus-report__departure'>
                                <span>Departure</span>
                                <strong>{busDetails.departure}</strong>
                            </div>
                        </section>

                        <section className='route-panel' aria-labelledby='route-heading'>
                            <div className='route-panel__heading'>
                                <div>
                                    <p className='bus-report__eyebrow'>Journey plan</p>
                                    <h2 id='route-heading'>Route stops</h2>
                                </div>
                                <span>{busDetails.stops?.length ?? 0} stops</span>
                            </div>
                            {busDetails.stops?.length ? (
                                <ol className='route-timeline'>
                                    {busDetails.stops.map((stop, index) => (
                                        <li className='route-stop' key={`${stop.order}-${stop.name}`}>
                                            <span className='route-stop__marker' aria-hidden='true'>{index + 1}</span>
                                            <div className='route-stop__details'>
                                                <strong>{stop.name}</strong>
                                                <span>{stop.arrival_time || 'Time not available'}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p className='route-empty'>No route stops have been added for this bus yet.</p>
                            )}
                        </section>
                    </main>
                )}
            </div>
           <Footer />
            </>
        )
       

}


export default BusDetailsPage;