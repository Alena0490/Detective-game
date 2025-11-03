import "./Modal.css";
import { useState } from "react";
import Clue from "../components/Clue";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onEvidenceComplete?: () => void;
  onClueFound?: () => void;
};

const TOTAL_CLUES = 4; // kolik clue slov v tomhle reportu máš

const WatchModal = ({   
  open,
  onClose,
  onEvidenceComplete,
  onClueFound,
}: ModalProps) => { 
  const [foundCount, setFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  if (!open) return null;

  const handleClueFound = () => {
    setFoundCount(prev => {
      const next = prev + 1;

      // globální hláška
      onClueFound?.();

      if (next === TOTAL_CLUES && !isCompleted) {
        setIsCompleted(true);
        onEvidenceComplete?.();
      }
      return next;
    });
  };

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal watch-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-title"
      >
        <header className="modal-header">
          <h2 id="watch-title" className="modal-title">Broken Watch</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3 className="capital">EVIDENCE ITEM — WRISTWATCH</h3>
                <p className="capital">CASE ID: PR-29-10-2025</p>
                <p className="capital">ITEM NO.: 08</p>
                <p className="capital">RECOVERED: 2025-10-29 / 08:12 CET</p>
                <p className="capital">LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
                <br/>
                <p><strong>Description:</strong></p>
                <p>Silver mechanical wristwatch of <Clue onFound={handleClueFound}>mid-20th-century design</Clue>.<br />
                Movement intact but non-functional.<br />
                Hands <Clue onFound={handleClueFound}>stopped precisely at&nbsp;<strong>02:08</strong></Clue>.</p>

                <p><strong>Remarks:</strong></p>
                <p>Item shows no signs of&nbsp;<Clue onFound={handleClueFound}>impact or&nbsp;external damage</Clue>.<br />
                Model discontinued in&nbsp;the&nbsp;1950s — <Clue onFound={handleClueFound}><strong>manufacturer no&nbsp;longer active</strong></Clue>.</p>
            </article>
              <p className="clue-status">
                Clues: {foundCount} / {TOTAL_CLUES}
                {isCompleted && " — Evidence completed."}
              </p>
          </section>
      </article>
    </div>
  );
};

export default WatchModal;
