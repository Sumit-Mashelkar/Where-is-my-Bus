import Hero from '../components/header.jsx'
import Footer from '../components/footer.jsx'
import { useLocation } from 'react-router-dom';




const ResultsPage = () => {

    const location = useLocation();
    const from = location.state.from
    const to = location.state.to
    //const { from, to } = location.state || {};


    return (
        <>
        
        <Hero/>
        <div className="results-page">
            <h1>Results Page</h1>
           <h2>{from} to {to}</h2>
        </div>
        <Footer/>
        </>       
    );
};

export default ResultsPage;

