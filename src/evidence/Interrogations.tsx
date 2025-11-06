import "./Evidence.css";
import Testimonies from "../img/testimonies.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  Interrogations({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence interrogations noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="lg"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Testimonies} alt="Testimonies" className="lg crt"/>
    </article>
  );
}

export default Interrogations;
