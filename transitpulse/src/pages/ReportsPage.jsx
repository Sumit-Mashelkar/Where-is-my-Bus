// contains all bus reports
import Hero from "../components/header";
import Footer from "../components/footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";



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

const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "0.9rem 1rem",
    borderRadius: "10px",
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "rgba(15, 23, 42, 0.8)",
    color: "#e2e8f0",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.6)",
}

const buttonStyle = {
    width: "100%",
    border: "none",
    borderRadius: "12px",
    padding: "12px 14px",
    background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
    color: "#ffffff",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.18)",
}
const ReportBusPage = () => {
    const navigate = useNavigate();

    const [busName, setBusName] = useState("")
    const [stopName, setStopName] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")

    const handleClick = () => {
        if (busName && stopName && status && description) {
        console.log("running")
        navigate("/", {
            state: 
            {bus: busName,

        }
            
        })
        }
        else {
            navigate("/error");
        }
    };

    return (
        <>
        <Hero />
        <div>report a bus</div>
        {/* <p>1: bus name, 2: display currrent time, 3: fetch the route/stops for busname, 4: current stop, 5: current status, 6: short description (optional) </p> */}
        <main style={mainStyle}>
            <form id = "report-bus-form" style={reportbusform}>
                <input type="text" 
                placeholder="Bus Name" 
                value={busName}
                style={inputStyle}
                onChange={(e) => {setBusName(e.target.value)}}/>

                <input type="text" 
                placeholder="stop name" 
                value={stopName}
                style={inputStyle}
                onChange={(e) => {setStopName(e.target.value)}}/>

                <input type="text" 
                placeholder="deplayed,cancelled ?" 
                value={status}
                style={inputStyle}
                onChange={(e) => {setStatus(e.target.value)}}/>

                <input type="text" 
                placeholder="describe" 
                value={description}
                style={inputStyle}
                onChange={(e) => {setDescription(e.target.value)}}/>

                <button style={buttonStyle} onClick={handleClick}>submit</button>
                 
            </form>
        </main>
        <Footer />
        </>
        
    )
}

export default ReportBusPage;