const Hero = () => {
  const heroText = "Transit Pulse";

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="center-text">
    <h1 onClick={handleClick} style={{ cursor: "pointer" }}>
      {heroText}</h1>
    

    <button className="button-icon-click" onClick={handleClick} style={{cursor: "pointer"}}>bell</button>
    </div>
  );
};

export default Hero;