import "./Buttons.css";

function DeleteButton({ width, onClick, text = "Delete" }) {
  return (
    <button
      className="delete-button"
      onClick={onClick}
      style={{ width: width }}
    >
      {text}
    </button>
  );
}

export default DeleteButton;
