const priceLabels = [
  ['general', 'General'],
  ['premium', 'Premium'],
  ['vip', 'VIP'],
]

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function MatchCard({ match, onBook }) {
  return (
    <article className="match-card">
      <div className="match-card-heading">
        <span className="match-number">Match {match.number}</span>
        <h3>{match.shortName}</h3>
      </div>
      <p className="match-date"><strong>Date &amp; time:</strong> {match.date}</p>
      <p className="match-venue"><strong>Venue:</strong> {match.venue}</p>
      <dl className="match-prices">
        {priceLabels.map(([category, label]) => (
          <div key={category}>
            <dt>{label}</dt>
            <dd>{currency.format(match.prices[category])}</dd>
          </div>
        ))}
      </dl>
      <button className="button button-accent match-book" type="button" onClick={() => onBook(match.id)}>
        Book
      </button>
    </article>
  )
}

export default MatchCard
