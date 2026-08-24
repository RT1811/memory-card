import Scoreboard from "./components/Scoreboard.jsx";
import CardGrid from "./components/CardGrid.jsx";

const placeholderCards = [
  { id: 1, name: "Pikachu", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Bulbasaur", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Charmander", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Squirtle", image: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Scoreboard score={0} bestScore={0} />
      <CardGrid cards={placeholderCards} />
    </div>
  );
}

export default App;
