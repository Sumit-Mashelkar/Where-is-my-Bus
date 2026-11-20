// auth page
import Hero from "../components/header";
import { useState } from "react";
import { useLocation } from "react-router-dom";


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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

     const handleClick = () => {

        async function handleLogin() {
            const login_credentials = {
                name: Name,
                email: Email,
                password: Password,
            }

            try {
                setIsLoading(true);
                const response = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(login_credentials),

                });
                const data = await response.json();
                setIsLoading(false);
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoading(false);
                console.error("Error logging in:", error);
            }
        }


    return (
        <>
        <Hero />
        <h2>auth page</h2>
        <div style={divStyle}>
            <button style={buttonStyle}>Log in with Google</button>
            
            <hr />  
       
            <form style={formStyle}>
                <input type="text" 
                placeholder="User Name" 
                value={Name}
                onChange={(e) => {
                        setName(e.target.value);}
                        }></input>
                <input type="text" 
                placeholder="Email Address"
                value={Email}
                onChange={(e) => {
                        setEmail(e.target.value);}
                        }></input>
                <input type="text"
                placeholder="Password"
                value={Password}
                onChange={(e) => {
                        setPassword(e.target.value);}
                        }></input>
                <button onClick={handleClick}>login</button>
            </form>
        </div>
        </>
    ) 
    
}

export default Auth;