// auth page

import { useState } from "react";

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
        <h2>auth page</h2>
        <p>hello</p>
        </>
    )
}

export default Auth;