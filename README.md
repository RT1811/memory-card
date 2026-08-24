# Memory Card Game

A Pokémon-themed memory game built with React.

The goal is simple: click each Pokémon only once. Every successful click increases your score and reshuffles the cards. Clicking a Pokémon that you have already selected resets your current score.

This project was built as part of [The Odin Project](https://www.theodinproject.com/) React curriculum.

## Live Demo

[Play the Memory Card Game](https://memory-card-two-sand.vercel.app/)

## Features

- Fetches 12 random Pokémon from the PokéAPI
- Displays Pokémon names and sprites
- Tracks the current score
- Tracks the best score for the current session
- Detects previously selected Pokémon
- Resets the current score after a repeated selection
- Shuffles cards after every click
- Uses the Fisher-Yates algorithm for unbiased card shuffling
- Generates a new set of Pokémon when starting a new game
- Preserves the best score when starting a new game
- Responsive layout for desktop, tablet, and mobile
- Keyboard-accessible card controls

## Built With

- React
- JavaScript
- Vite
- HTML
- CSS
- [PokéAPI](https://pokeapi.co/)
- Vercel

## React Concepts Used

This project provided practice with several core React concepts:

- Components
- Props
- `useState`
- `useEffect`
- Event handling
- Conditional game logic
- Rendering lists
- Updating state immutably
- Functional state updates
- Working with `Set` in React state
- Fetching data from an external API
- Async/await and `Promise.all`
- Component composition

## How It Works

When the application first loads, it generates 12 unique Pokémon IDs and fetches their data from the PokéAPI.

```text
Application mounts
        ↓
useEffect runs
        ↓
Generate 12 unique Pokémon IDs
        ↓
Fetch Pokémon concurrently
        ↓
Store card data in state
        ↓
Shuffle cards
        ↓
Render game
```

When a card is clicked:

```text
Click Pokémon
      ↓
Has this Pokémon been clicked before?
      ↓
   Yes / No
    ↓     ↓
 Reset   Increase score
 score   Remember ID
    \     /
     Shuffle cards
```

The game stores selected Pokémon IDs in a `Set`, making it easy to check whether a card has already been selected.

## Card Shuffling

The cards are shuffled using the Fisher-Yates algorithm.

Instead of mutating the React state array directly, the game first creates a copy:

```js
const shuffled = [...cards];
```

and then performs the shuffle on the copied array.

This keeps React state immutable while providing an unbiased shuffle.

## API Data

Pokémon data is fetched from:

```text
https://pokeapi.co/api/v2/pokemon/{id}
```

Only the data required by the application is stored:

```js
{
  id: pokemon.id,
  name: pokemon.name,
  image: pokemon.sprites.front_default
}
```

Twelve requests are executed concurrently using `Promise.all()`.

## Project Structure

```text
src/
├── components/
│   ├── Card.jsx
│   ├── CardGrid.jsx
│   └── Scoreboard.jsx
│
├── styles/
│   ├── App.css
│   ├── Card.css
│   ├── CardGrid.css
│   ├── Scoreboard.css
│   └── index.css
│
├── App.jsx
└── main.jsx
```

### Component Responsibilities

- **App** — owns game state, API fetching, scoring, and game logic
- **Scoreboard** — displays the current and best scores
- **CardGrid** — renders the collection of Pokémon cards
- **Card** — represents an individual interactive Pokémon card

## Accessibility

Accessibility was tested manually and with multiple automated tools.

Accessibility considerations include:

- Semantic `<main>` structure
- Cards implemented as native buttons
- Keyboard-accessible game controls
- Visible focus states
- Decorative Pokémon images use empty alternative text because the Pokémon name is already provided as visible button text
- Responsive layout
- Sufficient color contrast

Automated testing results:

- Lighthouse Accessibility: **100**
- axe DevTools: **0 issues**
- WAVE: **0 errors**

## Lighthouse

Production build results:

| Category | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

## Getting Started

Clone the repository:

```bash
git clone https://github.com/RT1811/memory-card.git
```

Enter the project directory:

```bash
cd memory-card
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## What I Learned

This project helped reinforce the React concepts introduced in my previous projects while introducing side effects and external API data.

One of the main concepts I practiced was using `useEffect` for work that happens outside React. The application fetches Pokémon data when the component mounts, while user-driven game logic remains inside event handlers.

I also practiced working with asynchronous JavaScript by generating multiple API requests and executing them concurrently with `Promise.all()`.

For tracking selected cards, I used a JavaScript `Set` because the game needs to efficiently answer whether a Pokémon ID has already been selected. Updates create a new `Set` instead of mutating the existing state.

The project also reinforced the importance of immutable React state. The Fisher-Yates shuffle operates on a copy of the cards array instead of modifying the existing state directly.

Finally, the application was tested for responsive design and accessibility using manual keyboard testing, Lighthouse, axe DevTools, and WAVE.

## Future Improvements

Possible future additions include:

- Loading state while Pokémon are being fetched
- Error handling for failed API requests
- Difficulty settings with different numbers of cards
- Persistent high scores using local storage
- Additional Pokémon generations
- Card animations
- Improved game feedback after a repeated selection

## Author

**Ritwick Thakur**

- GitHub: [@RT1811](https://github.com/RT1811)