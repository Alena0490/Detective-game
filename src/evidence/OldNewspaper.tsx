import "./Evidence.css";
import Newspaper from "../img/newspaper.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function OldNewspaper({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence newspaper noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="sm"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Newspaper} alt="Old newspaper" className="sm"/>
    </article>
  );
}

export default OldNewspaper;
