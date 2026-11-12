// auth page
import Hero from "../components/header";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const divStyle = {
    margin: " 25px 20%",
    padding: "20px",
    postion: "sticky",
    top: "10px",
    bottom: 0,
    left: 0,
    right: 0,
}

const buttonStyle = {
    margin: "0 10%",
    padding: " 0 20%"
}

const formStyle = {
    backgroundColor: "#ffffff",
    padding: "12px 20px",
    left: 0,
    right: 0,
    top: 10,
    margin: "10px 10%",
    height: "64px",
    position: "sticky",
    border: "1px solid darkblue" ,
    display: "relative",
    alignItems: "center",
    borderRadius: "10px",
    }

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    return (
        <>
        <Hero />
        <h2>auth page</h2>
        <div style={divStyle}>
            <button style={buttonStyle}>Log in with Google</button>
            
            <hr />  
       
            <form style={formStyle}>
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Email address"></input>
                <input type="text" placeholder="Password"></input>
            </form>
        </div>
        </>
    ) 
    
}

export default Auth;