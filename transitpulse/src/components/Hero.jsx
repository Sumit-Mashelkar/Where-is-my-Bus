const Hero = () => {
  const heroText = "Transit Pulse";

  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <section onClick={handleClick} style={{ cursor: "pointer" }}>
      <h1>{heroText}</h1>
    </section>
  );
};

export default Hero;