function LandingPage() {
  return (
    <div className="landing-shell">
      <div className="app-header">
        <p className="eyebrow">TransitPulse</p>
        <h1 id="title">Where is my Bus</h1>
      </div>

      <section className="search-panel" aria-label="Route search">
        <h2>Find Your Bus</h2>

        <input
          type="text"
          placeholder="Starting stop"
        />

        <input
          type="text"
          placeholder="Destination stop"
        />

        <button id="searchBtn" type="button">
          Find Buses
        </button>
      </section>
    </div>
  );
}

export default LandingPage;



