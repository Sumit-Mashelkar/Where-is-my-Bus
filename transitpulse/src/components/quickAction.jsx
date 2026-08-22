// quick access menu



const CardStyles = {
    left: "50%",
    top: "500px",

    padding: "18px",
    justifyContent: "center",
    gap: "12px",
    transform: "translate(-50%, -50%)",
    background: "#ffffff",
    position: "absolute",
    display: "flex",
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
    color: "#1e293b",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    fontWeight: "600",
    alignItems: "center",
    textAlign: "center",


} 

const QuickAcess = () => {

    return (
        
        <div id ="QuickAccessCard" style={CardStyles}>
            <div  style={iconStyles}>report a Bus</div>
            <div  style={iconStyles}>add a Route</div>
        </div>
       

    )

}

export default QuickAcess;


