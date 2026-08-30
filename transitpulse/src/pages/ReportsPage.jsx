// contains all bus reports
import Hero from "../components/header";
import Footer from "../components/footer";
import { color } from "framer-motion";

const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "30vh",

    
}

const reportbusform = {
    padding: "10%",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    display: "flex",
    flexDirection: "column",
    gap: "12Px",
    width: "min(98%, 480px)",
    // minHeight: "90%",
    boxSizing: "border-box",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(234, 139, 66, 0.2)",
    backdropFilter: "blur(10px)",
}

const ReportBusPage = () => {
    return (
        <>
        <Hero />
        <div>report a bus</div>
        {/* <p>1: bus name, 2: display currrent time, 3: fetch the route/stops for busname, 4: current stop, 5: current status, 6: short description (optional) </p> */}
        <main style={mainStyle}>
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