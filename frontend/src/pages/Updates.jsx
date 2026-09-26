import React, { useState } from "react";
import Hero from "../components/header";
import Footer from "../components/footer";


// dummy component
function Updates (){
    const [isloading, setIsLoading] = useState(false)
    const [buses, setBuses] = useState([])
    const [error, setError] = useState(false)

    function BusList() {

        const FetchUpdates = async () => {
            setIsLoading(true)
            const response = awaitfetch("http://127.0.0.1:5000/Updates", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const buses = await response.json();
            {response && !isloading}return (
                <div>
                {buses.map((bus) => (
                <div>{bus}</div>
                ))}
            </div>

            )
        }
    }

    return (
        <>
        <Hero />
        <p>App2 transitpulse</p>
        <section>
            {BusList()}
        </section>
        <Footer />
        </>
    )
}

export default Updates;