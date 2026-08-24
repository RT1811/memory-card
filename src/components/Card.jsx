import "../styles/Card.css";

function Card({ id, name, image, onClick }) {
    return (
        <button
        className="card"
        type="button"
        onClick={() => onClick(id)}
        >
        <img src={image} alt="" />
        <p>{name}</p>
        </button>
    );
}

export default Card;