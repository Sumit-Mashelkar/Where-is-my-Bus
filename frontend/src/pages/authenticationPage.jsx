// auth page
import Hero from "../components/header";
import { useState } from "react";
import { useLocation } from "react-router-dom";


const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    return (
        <>
        <Hero />
        <h2>auth page</h2>
        <div>
            <button style={}>Log in with Google</button>
            <p>OR</p>
            <hr />
       
            <form style={}>
            
                <input type="text" placeholder="Name"></input>
                <input type="text" placeholder="Email address"></input>
                <input type="text" placeholder="Password"></input>
            </form>
        </div>
        </>
    ) 
    
}

export default Auth;