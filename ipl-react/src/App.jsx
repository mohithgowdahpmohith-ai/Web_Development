import { useEffect, useState } from 'react'
import './App.css'
import BookingForm from './components/BookingForm.jsx'
import Hero from './components/Hero.jsx'
import MatchCard from './components/MatchCard.jsx'
import Navbar from './components/Navbar.jsx'
import { teams, matches } from './data/matches.js'

function App() {
  const [teamFilter, setTeamFilter] = useState('all')
  const [view, setView] = useState('grid')
  const [selectedMatchId, setSelectedMatchId] = useState('')
  const [stand, setStand] = useState('general')
  const [quantity, setQuantity] = useState('1')
  const [toast, setToast] = useState('Welcome to IPL Ticket Booking!')

  useEffect(() => {
    if (!toast) return undefined

    const timer = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const filteredMatches = matches.filter((match) =>
    teamFilter === 'all' || match.teams.some((team) => team.code === teamFilter),
  )

  function chooseMatch(matchId) {
    setSelectedMatchId(matchId)
    setToast('Booking form is ready.')
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  function updateSummary(setter, value) {
    setter(value)
    setToast('Booking summary updated.')
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section className="section" id="matches" aria-labelledby="matches-title">
          <div className="section-heading">
            <p className="eyebrow">Find your match</p>
            <h2 id="matches-title">IPL 2026 Match Schedule</h2>
            <p>Pick a fixture, compare stand prices, and book your match day.</p>
          </div>

          <div className="match-controls">
            <label htmlFor="team-filter">
              Filter by team
              <select
                id="team-filter"
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
              >
                <option value="all">All teams</option>
                {teams.map((team) => (
                  <option key={team.code} value={team.code}>{team.name}</option>
                ))}
              </select>
            </label>

            <div className="view-toggle" role="group" aria-label="Match display style">
              <button
                type="button"
                aria-pressed={view === 'grid'}
                onClick={() => setView('grid')}
              >
                Grid view
              </button>
              <button
                type="button"
                aria-pressed={view === 'list'}
                onClick={() => setView('list')}
              >
                List view
              </button>
            </div>
          </div>

          <div className={`match-grid ${view === 'list' ? 'is-list' : ''}`}>
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} onBook={chooseMatch} />
            ))}
          </div>
          {filteredMatches.length === 0 && (
            <p className="empty-state" role="status">No matches found for this team.</p>
          )}
        </section>

        <BookingForm
          matches={matches}
          selectedMatchId={selectedMatchId}
          stand={stand}
          quantity={quantity}
          onMatchChange={(value) => updateSummary(setSelectedMatchId, value)}
          onStandChange={(value) => updateSummary(setStand, value)}
          onQuantityChange={(value) => updateSummary(setQuantity, value)}
        />
      </main>
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  )
}

export default App
