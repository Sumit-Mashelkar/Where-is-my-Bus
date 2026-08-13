import Hero from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const location = useLocation();
    const buses = location.state?.buses ?? [];
    const from = location.state?.from ?? "";
    const to = location.state?.to ?? "";

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
                            <div key={bus.id} className="bus-item">
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

