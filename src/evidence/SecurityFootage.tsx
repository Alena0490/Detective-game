import "./Evidence.css";
import Footage from "../img/footage.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  SecurityFootage({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence security-footage noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="lg"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Footage} alt="Security footage" className="lg crt"/>
    </article>
  );
}

export default SecurityFootage;
