import "./styles/RoundButton.css";

export const RoundButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}>+</button>
);
