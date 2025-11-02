import "./Evidence.css";
import Photo from "../img/old-photo.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  OldPhoto({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className="one-evidence old-photo noir-ca"
      data-state={state}
      data-size="sm"
      tabIndex={0}
      role="button"   
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Photo} alt="Old photo of dr. Antonin Richter" className="sm"/>
    </article>
  );
}

export default OldPhoto;
