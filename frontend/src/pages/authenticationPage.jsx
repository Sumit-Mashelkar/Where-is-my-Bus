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
    background: "linear-gradient(90deg,rgb(206, 251, 206), rgb(16, 89, 1) ,rgb(206, 251, 206) )",
    padding: "12px 20px",
    left: 0,
    right: 0,
    top: 10,
    margin: "10px 10px",
    height: "64px",
    position: "sticky",
    // border: "1px solid orange" ,
    display: "relative",
    alignItems: "center",
    borderTop:"2px solid rgb(21, 85, 2)",
    borderBottom: "2px solid rgb(21, 85, 2) ",
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