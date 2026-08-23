// quick access menu
import { useNavigate } from "react-router-dom";


const CardStyles = {
    left: "50%",
    bottom: "56px",
    padding: "18px",
    justifyContent: "center",
    gap: "12px",
    transform: "translateX(-50%)",
    background: "#6b6b6d",
    position: "absolute",
    display: "block",
    flexDirection: "column",
    alignItems: "center",
    width: "min(70%, 520px)",
    boxSizing: "border-box",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
};

const iconStyles = {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "10px",
    padding: "12px 16px",
    margin: 0,
    color: "#fbfbfb",
    background: "#010304",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    fontWeight: "600",
    alignItems: "center",
    textAlign: "center",


} 

const QuickAcess = () => {
    
    const handleClick = () => {
        Navigate("/url")
    }

    return (
        
        <div id ="QuickAccessCard" style={CardStyles}>
            <div  style={iconStyles} onClick={handleClick}>report a Bus</div>
            <div  style={iconStyles}>add a Route</div>
        </div>
       

    )

}

export default QuickAcess;


