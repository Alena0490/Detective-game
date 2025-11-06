import "./Evidence.css";
import WristWatch from "../img/watch.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  Watch({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
        className={`one-evidence watch noir ${completed ? "completed" : ""}`}
        data-state={state}
        data-size="sm"
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        >
        <img src={WristWatch} alt="Old watch showing time 2:08" className="sm"/>
    </article>
  );
}

export default Watch;
