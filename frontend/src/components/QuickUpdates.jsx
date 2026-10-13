// provides a continious moving updates on the top
import { useState, useEffect } from "react";

const QuickUpdates = () => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchUpdates = async () => {
            setIsloading(true);
            try {
                const response = await fetch("http://localhost:5173/QuickUpdates")
                const data = await response.json();
                if (!data) { 
                    throw new Error("failed to fetch updates")
                }

            }catch{
            
            }finally{
                setIsloading(false)
            }
        
        }}
    )
}

export default QuickUpdates;