import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard.jsx";
import CardGrid from "./components/CardGrid.jsx";

function App() {
  const [cards,setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState(new Set());

  function handleCardClick(id) {
    if (clickedIds.has(id)) {;
      if (score > bestScore) setBestScore(score);
      setScore(0);
      setClickedIds(new Set());
    } else {
      setClickedIds((prev) => new Set(prev).add(id));
      setScore((prev) => prev + 1);
    }
  }

  useEffect(() => {
    async function fetchPokemon() {
      const randomIDs = new Set();
      while (randomIDs.size < 12) {
        randomIDs.add(Math.floor(Math.random() * 151) + 1);
      }

      const requests = [...randomIDs].map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
    );

    const result = await Promise.all(requests);

    const formattedCards = result.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
    }))

    setCards(formattedCards);
    }

    fetchPokemon();
  }, [])

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;
