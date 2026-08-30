// contains all bus reports
import Hero from "../components/header";
import Footer from "../components/footer";

const reportbusform = {
    

}

const ReportBusPage = () => {
    return (
        <>
        <Hero />
        <div>report a bus</div>
        {/* <p>1: bus name, 2: display currrent time, 3: fetch the route/stops for busname, 4: current stop, 5: current status, 6: short description (optional) </p> */}
        <main>
            <form id = "report-bus-form" style={reportbusform}>
                <input type="text" placeholder="Bus Name" ></input>
                <input type="text" placeholder="stop name" ></input>
                <input type="text" placeholder="deplayed,cancelled ?" ></input>
                <input type="text" placeholder="describe" ></input>
                <button>submit</button>
                 
            </form>
        </main>
        <Footer />
        </>
        
    )
}

export default ReportBusPage;