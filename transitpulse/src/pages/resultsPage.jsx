import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const ResultsPage = () => {
    const location = useLocation();
    const buses = location.state?.buses ?? [];
    const from = location.state?.from ?? "";
    const to = location.state?.to ?? "";


    const navigate = useNavigate();

    const handleBusItemClick =  async (busId) => {
        // Handle the click event for a bus item
        console.log("Bus item clicked:", busId);

        try{
        const response = await fetch(`http://127.0.0.1:5000/BusDetails/${busId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   busId:busId
                }),
            });
        if (!response.ok) {
                throw new Error("Search request failed");
            }

        const data = await response.json();
               
        navigate(`/BusDetail/${busId}`,{
                state: {
                busDetails: data,
            },
        });
        
    } catch (error) {
            console.log("error encountered while fetching data");
            
        } finally {
            console.log("finally executed");
        }

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

