import Hero from '../components/header.jsx';
import Search from '../components/search.jsx';
import Footer from '../components/footer.jsx';
import QuickAcess from '../components/quickAction.jsx';


const LandingPage = () => {
    

    return (
        <main className="landing-page">
            <Hero />
            <Search />
            <QuickAcess />
            <Footer />
        </main>
    );
};
 
export default LandingPage;