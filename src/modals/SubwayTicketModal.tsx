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

const SubwayTicketModal = ({ 
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
        className="modal ticket-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
      >
        <header className="modal-header">
          <h2 id="ticket-title" className="modal-title">Subway Ticket</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3 className="capital">EVIDENCE ITEM — METRO TICKET</h3>
                <p className="capital">CASE ID: PR-29-10-2025</p>
                <p className="capital">ITEM NO.: 02</p>
                <p className="capital">RECOVERED: 2025-10-29 / 08:12 CET</p>
                <p className="capital">LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
                <br/>
                <h3>Description:</h3>
                <p>Paper fare ticket, <Clue onFound={handleClueFound}>mid-20th-century</Clue> format.<br />
                Non-standard substrate; faint embedded lattice visible under oblique light.<br />
                Line: <Clue onFound={handleClueFound}><strong>“Line-0”</strong></Clue> — <em>unofficial / non-public; <Clue onFound={handleClueFound}>no&nbsp;record in&nbsp;municipal transit registry</Clue></em>.<br />
                Serial: <strong className="capital">[REDACTED]</strong>.</p>

                <p><strong>Remarks:</strong></p>
                <p>Slight thermal discoloration; <Clue onFound={handleClueFound}>no&nbsp;charring or&nbsp;tearing observed</Clue>.<br />
                Ticket type discontinued; issuing authority not active / undocumented.</p>
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

export default SubwayTicketModal;
