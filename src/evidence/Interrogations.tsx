import "./Evidence.css";
import Testimonies from "../img/testimonies.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  Interrogations({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className="one-evidence interrogations"
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
