// contains all bus reports
import Hero from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


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
    boxShadow: "0 8px 16px rgba(37, 99, 235, 0.18)",
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

    const [buses, setBuses] = useState([])
    const [selectedBusId, setSelectedBusId] = useState("")
    const [stops, setStops] = useState([])
    const [stopName, setStopName] = useState("")
    const [status, setStatus] = useState("")
    const [direction, setDirection] = useState("")
    const [isSending, setIsSending] = useState(false)
    const [isLoadingBuses, setIsLoadingBuses] = useState(true)
    const [isLoadingStops, setIsLoadingStops] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const controller = new AbortController()
        console.log("loading bus details from buses table")
        const loadBuses = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/buses", {
                    signal: controller.signal,
                })
                if (!response.ok) {
                    throw new Error("Unable to load buses.")
                }
                setBuses(await response.json())
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error)
                    setErrorMessage("Unable to load buses. Please try again.")
                }
            } finally {
                setIsLoadingBuses(false)
            }
        }

        loadBuses()
        return () => controller.abort()
    }, [])

    useEffect(() => {
        if (!selectedBusId) {
            return undefined
        }

        const controller = new AbortController()
        const loadStops = async () => {
            setIsLoadingStops(true)
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/BusDetails/${selectedBusId}`,
                    { signal: controller.signal }
                )
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.error || "Unable to load this bus route.")
                }
                setStops(data.stops)
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error)
                    setErrorMessage(error.message || "Unable to load this bus route.")
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoadingStops(false)
                }
            }
        }

        loadStops()
        return () => controller.abort()
    }, [selectedBusId])

    const handleBusChange = (event) => {
        setSelectedBusId(event.target.value)
        setStopName("")
        setStops([])
        setErrorMessage("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const selectedBus = buses.find((bus) => String(bus.id) === selectedBusId)
        if (selectedBus && stopName.trim() && status.trim() && direction.trim()) {
        setIsSending(true)
        setErrorMessage("")

        try {
            const response = await fetch("http://127.0.0.1:5000/reportBus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bus_number: selectedBus.bus_number,
                current_stop: stopName.trim(),
                direction: direction.trim(),
                status: status.trim(),
            }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Bus report request failed.")
            }

            await response.json()
            navigate("/")
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || "Unable to report a bus. Please try again.")
        } finally {
            setIsSending(false)
        }
        } else {
            setErrorMessage("Please complete all fields before submitting.")
        }
    };

    return (
        <>
        <Hero />
        <div>report a bus</div>
        <main style={mainStyle}>
            <form id = "report-bus-form" style={reportbusform} onSubmit={handleSubmit}>
                <select
                    value={selectedBusId}
                    style={inputStyle}
                    onChange={handleBusChange}
                    required
                    disabled={isLoadingBuses || buses.length === 0}
                >
                    <option value="">
                        {isLoadingBuses ? "Loading buses..." : "Select a bus"}
                    </option>
                    {buses.map((bus) => (
                        <option key={bus.id} value={bus.id}>
                            {bus.bus_name} ({bus.bus_number})
                        </option>
                    ))}
                </select>

                <select
                    value={stopName}
                    style={inputStyle}
                    onChange={(e) => setStopName(e.target.value)}
                    required
                    disabled={!selectedBusId || isLoadingStops || stops.length === 0}
                >
                    <option value="">
                        {isLoadingStops ? "Loading stops..." : "Select current stop"}
                    </option>
                    {stops.map((stop) => (
                        <option key={stop.order} value={stop.name}>
                            {stop.name}
                        </option>
                    ))}
                </select>

                <input type="text" 
                placeholder="Delayed, cancelled?"
                value={status}
                style={inputStyle}
                required
                onChange={(e) => {setStatus(e.target.value)}}/>

                <input type="text" 
                placeholder="direction" 
                value={direction}
                style={inputStyle}
                required
                onChange={(e) => {setDirection(e.target.value)}}/>

                <button type="submit" style={buttonStyle} disabled={isSending}>
                    {isSending ? "Submitting..." : "Submit"}
                </button>
                {errorMessage && <p role="alert">{errorMessage}</p>}
                 
            </form>
        </main>
        <Footer />
        </>
        
    )
}
export default ReportBusPage;