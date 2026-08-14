import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
    const location = useLocation();
    const buses = location.state?.buses ?? [];
    const from = location.state?.from ?? "";
    const to = location.state?.to ?? "";


    const navigate = useNavigate();

    const handleBusItemClick = (busId) => {
        // Handle the click event for a bus item
        console.log("Bus item clicked:", busId);
        // You can navigate to a detailed page or perform any other action here
        // For example: navigate(`/bus/${bus.id}`);
        navigate("/BusDetail")
        // const response = await fetch("http://127.0.0.1:5000/search", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //            bus
        //         }),
        //     });

    };
    
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
                                <p>Bus Number: {bus.bus_number}</p>
                                <p>From: {bus.from_city}</p>
                                <p>To: {bus.to_city}</p>
                                <p>Departure: {bus.departure}</p>
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

