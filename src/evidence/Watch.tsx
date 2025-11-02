import "./Evidence.css";
import WristWatch from "../img/watch.webp"

type Props = {
  onOpen?: () => void;                         // volitelný callback pro otevření dialogu
  state?: "new" | "seen" | "verified";         // volitelný vizuální stav (data-atribut)
};

function  Watch({ onOpen, state }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
        className="one-evidence watch noir-ca"
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
