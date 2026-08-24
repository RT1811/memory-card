import { useState, useEffect } from "react";
import Scoreboard from "./components/Scoreboard.jsx";
import CardGrid from "./components/CardGrid.jsx";

function App() {
  const [cards,setCards] = useState([]);

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
      <Scoreboard score={0} bestScore={0} />
      <CardGrid cards={cards} />
    </div>
  );
}

export default App;
