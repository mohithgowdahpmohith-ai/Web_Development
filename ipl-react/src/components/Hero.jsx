function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">The biggest cricket celebration</p>
        <h1 id="hero-title">Experience The Stadium Energy Live!</h1>
        <p>Be there for every boundary, wicket, and unforgettable moment.</p>
        <div className="hero-actions">
          <a className="button button-outline" href="#matches">View Schedule</a>
          <a className="button button-accent" href="#booking">Book Ticket</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
