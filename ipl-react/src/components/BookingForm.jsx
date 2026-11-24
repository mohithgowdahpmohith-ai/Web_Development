const standLabels = {
  general: 'General',
  premium: 'Premium',
  vip: 'VIP',
}

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function BookingForm({
  matches,
  selectedMatchId,
  stand,
  quantity,
  onMatchChange,
  onStandChange,
  onQuantityChange,
}) {
  const selectedMatch = matches.find((match) => match.id === selectedMatchId)
  const ticketPrice = selectedMatch?.prices[stand]
  const ticketCount = Number(quantity)
  const validQuantity = Number.isInteger(ticketCount) && ticketCount >= 1 && ticketCount <= 6

  return (
    <section className="section booking-section" id="booking" aria-labelledby="booking-title">
      <div className="section-heading">
        <p className="eyebrow">Make it a match day</p>
        <h2 id="booking-title">Book your tickets</h2>
        <p>Select a match and stand to see your live booking summary.</p>
      </div>

      <div className="booking-layout">
        <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="booking-match">
            Match
            <select
              id="booking-match"
              value={selectedMatchId}
              onChange={(event) => onMatchChange(event.target.value)}
              required
            >
              <option value="">Choose a match</option>
              {matches.map((match) => (
                <option key={match.id} value={match.id}>{match.shortName} — {match.date}</option>
              ))}
            </select>
          </label>
          <label htmlFor="booking-stand">
            Stand category
            <select
              id="booking-stand"
              value={stand}
              onChange={(event) => onStandChange(event.target.value)}
            >
              {Object.entries(standLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label htmlFor="booking-quantity">
            Number of tickets
            <input
              id="booking-quantity"
              type="number"
              min="1"
              max="6"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              required
            />
          </label>
        </form>

        <aside className="booking-summary" aria-labelledby="summary-title">
          <p className="eyebrow">Your selection</p>
          <h3 id="summary-title">Booking summary</h3>
          <dl>
            <dt>Match</dt>
            <dd>{selectedMatch?.shortName ?? 'Select a match'}</dd>
            <dt>Date &amp; time</dt>
            <dd>{selectedMatch?.date ?? '—'}</dd>
            <dt>Venue</dt>
            <dd>{selectedMatch?.venue ?? '—'}</dd>
            <dt>Stand</dt>
            <dd>{standLabels[stand]}</dd>
            <dt>Ticket price</dt>
            <dd>{ticketPrice ? currency.format(ticketPrice) : '—'}</dd>
            <dt>Quantity</dt>
            <dd>{validQuantity ? ticketCount : '—'}</dd>
          </dl>
          <p className="summary-total">
            <span>Total amount</span>
            <strong>
              {selectedMatch && validQuantity
                ? currency.format(ticketPrice * ticketCount)
                : '—'}
            </strong>
          </p>
        </aside>
      </div>
    </section>
  )
}

export default BookingForm
