import "./Evidence.css";
import Ticket from "../img/subway-ticket.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  SubwayTicket({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className="one-evidence ticket"
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
