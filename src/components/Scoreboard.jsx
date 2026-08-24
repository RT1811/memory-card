import "../styles/Scoreboard.css";

function Scoreboard({ score, bestScore }) {
    return (
         <div className="scoreboard">
            <div className="score">
                <span>Score</span>
                <strong>{score}</strong>
            </div>

            <div className="score">
                <span>Best Score</span>
                <strong>{bestScore}</strong>
            </div>
        </div>
    );
}

export default Scoreboard;