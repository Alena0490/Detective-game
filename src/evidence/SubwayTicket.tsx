import "./Evidence.css";
import Ticket from "../img/subway-ticket.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  SubwayTicket({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence ticket noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="sm"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Ticket} alt="Old subway ticket" className="sm"/>
    </article>
  );
}

export default SubwayTicket
