import "./Evidence.css";
import Metro from "../img/metro-incident-report.webp"

type Props = {
  onOpen?: () => void; 
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  IncidentReport({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence incident-report noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="lg"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={Metro} alt="Incident report from 29.10. 2025" className="lg"/>
    </article>
  );
}

export default IncidentReport;
