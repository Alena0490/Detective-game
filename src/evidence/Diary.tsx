import "./Evidence.css";
import Notebook from "../img/notebook.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function Diary({ onOpen, state, completed }: Props) {  // ← Přidáno completed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence notebook noir ${completed ? "completed" : ""}`}
      data-state={state}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Notebook} alt="Old notebook from 1955" className="lg"/>
    </article>
  );
}

export default Diary;