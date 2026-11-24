# IPL 2026 Ticket Booking

A responsive React and Vite booking UI with reusable navigation, hero, match-card, and booking-form components.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

The match schedule is defined in `src/data/matches.js`. `App.jsx` maps that data to `MatchCard` components and manages team filtering and grid/list views. The booking form keeps the selected match, stand, quantity, and total in React state.
