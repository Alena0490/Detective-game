import "./Evidence.css";
import MedicalNotes from "../img/medical-report.webp"

type Props = {
  onOpen?: () => void;
  state?: "new" | "seen" | "verified";
  completed?: boolean;
};

function  MedicalReport({ onOpen, state, completed }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`one-evidence medical-notes noir ${completed ? "completed" : ""}`}
      data-state={state}
      data-size="lg"
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <img src={MedicalNotes} alt="Medical report" className="lg"/>
    </article>
  );
}

export default MedicalReport;
