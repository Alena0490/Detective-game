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

const SecurityFootageModal = ({ 
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
        className="modal footage-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="footage-title"
      >
        <header className="modal-header">
          <h2 id="footage-title" className="modal-title">Security Footage</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3 className="capital">EVIDENCE ITEM — SECURITY FOOTAGE</h3>
                <p className="capital">CASE ID: PR-29-10-2025</p>
                <p className="capital">ITEM NO.: 04</p>
                <p className="capital">ACQUIRED: 2025-11-02 / 11:49 CET</p>
                <p className="capital">ORIGIN: CITY METRO SECURITY — CAMERA 07 (Line&nbsp;C)</p>
            </article>
            <br/>
            <article>
                <h3>Security Camera Recording</h3>
                <p>CAM: 07 — Line&nbsp;C / Maintenance Access Corridor</p>
                <p>DATE: 2025-10-29</p>
                <p>TIME: 03:00-03:30</p>

                <p><strong>Notes:</strong></p>
                <p>[03:12] SUBJECT OBSERVED EXITING <Clue onFound={handleClueFound}>LINE&nbsp;C SERVICE TUNNEL</Clue>.<br />
                SUBJECT LOOKS TOWARD CAMERA — <Clue onFound={handleClueFound}>APPEARS DISORIENTED</Clue>.<br />
                PROCEEDS NORTH TOWARD <Clue onFound={handleClueFound}>VLTAVSKÁ STATION</Clue>.</p>

                <p>TRACK SECTION CONFIRMED <Clue onFound={handleClueFound}><strong>DE-ENERGIZED</strong></Clue> AT TIME OF&nbsp;RECORDING.</p>
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

export default SecurityFootageModal;
