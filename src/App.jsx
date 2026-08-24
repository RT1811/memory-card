import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard.jsx";
import CardGrid from "./components/CardGrid.jsx";

function App() {
  const [cards,setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());

   async function fetchPokemon() {
    const randomIDs = new Set();

    while (randomIDs.size < 12) {
      randomIDs.add(Math.floor(Math.random() * 151) + 1);
    }

    const requests = [...randomIDs].map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      )
    );

    const result = await Promise.all(requests);

    const formattedCards = result.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }));

    setCards(formattedCards);
  }

  function handleCardClick(id) {
    if (clickedIds.has(id)) { 
      if (score > bestScore) setBestScore(score);
      setScore(0);
      setClickedIds(new Set());
    } else {
      setClickedIds((prev) => new Set(prev).add(id));
      const nextScore = score + 1;
      setScore(nextScore);
      if (nextScore > bestScore) setBestScore(score);
    }

    setCards((prev) => shuffleCards(prev));
  }

  function shuffleCards(cards) {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function handleNewGame() {
    setScore(0);
    setClickedIds(new Set());

    fetchPokemon();
  }

  useEffect(() => {
    fetchPokemon();

    fetchPokemon();
  }, [])

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
       <button onClick={handleNewGame}>
        New Game
      </button>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;
