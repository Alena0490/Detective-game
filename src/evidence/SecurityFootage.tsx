import "./Evidence.css";
import Footage from "../img/footage.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  SecurityFootage({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className="one-evidence security-footage noir-ca"
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
