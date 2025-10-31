import "./Evidence.css";
import Notebook from "../img/notebook.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  Diary({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className="one-evidence notebook"
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
