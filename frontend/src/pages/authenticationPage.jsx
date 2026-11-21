// auth page
import Hero from "../components/header";
import { useState } from "react";


const divStyle = {
    margin: " 25px 20px",
    padding: "20px",
    postion: "sticky",
    top: "10px",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
}

const buttonStyle = {
    margin: "0 10%",
    padding: " 0 20%"
}

const formStyle = {
    background: "linear-gradient(20deg,rgb(199, 211, 250), rgb(25, 0, 252)70%)",
    padding: "12px 20px",
    left: 0,
    right: 0,
    top: 10,
    margin: "10px 10px",
    height: "64px",
    position: "sticky",
    //border: "1px solid orange" ,
    display: "absolute",
    alignItems: "center",
    borderTop:"2px solid rgb(1, 5, 0)",
    borderBottom: "2px solid rgb(0, 1, 0) ",
    borderRadius: "10px",
    }

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setMessage("");

        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: Name,
                    email: Email,
                    password: Password,
                }),
            });
            const data = await response.json();
            setMessage(data.message || data.error || "Unable to create account.");
        } catch (error) {
            console.error("Error creating account:", error);
            setMessage("Unable to reach the server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
        <Hero />
        <h2>Create account</h2>
        <div style={divStyle}>
            <button style={buttonStyle}>Log in with Google</button>
            
            <hr />  
       
            <form style={formStyle}
            onSubmit={handleLogin}>
                <input type="text" 
                placeholder="User Name"
                aria-label="User name"
                maxLength={30}
                required
                value={Name}
                onChange={(e) => {
                        setName(e.target.value);}
                        }></input>
                <input type="email"
                placeholder="Email Address"
                aria-label="Email address"
                maxLength={40}
                required
                value={Email}
                onChange={(e) => {
                        setEmail(e.target.value);}
                        }></input>
                <input type="password"
                placeholder="Password"
                aria-label="Password"
                maxLength={40}
                required
                value={Password}
                onChange={(e) => {
                        setPassword(e.target.value);}
                        }></input>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                </button>
            </form>
            {message && <p role="status">{message}</p>}
        </div>
        </>
    ) 
    
}

export default Auth;