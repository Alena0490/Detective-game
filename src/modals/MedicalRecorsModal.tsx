import "./Modal.css";
import { useState } from "react";
import Clue from "../components/Clue";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onEvidenceComplete?: () => void;
  onClueFound?: () => void;
};

const TOTAL_CLUES = 4; // retrograde amnesia, Küntscher nail, amalgam fillings, phenylmercuric compounds

const MedicalRecordModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onEvidenceComplete,
  onClueFound,
}) => {
  const [foundCount, setFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // guard musí být AŽ po hookách
  if (!open) return null;

  const handleClueFound = () => {
    setFoundCount((prev) => {
      const next = prev + 1;

      // globální hláška do MainGame (Clue found)
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
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article
        className="modal medical-record-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medical-record-title"
      >
        <header className="modal-header">
          <h2 id="medical-record-title" className="modal-title">
            Medical Record
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          <article>
            <h3>EVIDENCE ITEM — MEDICAL REPORT</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 06</p>
            <p>RECOVERED: 2025-10-29 / 10:55 CET</p>
            <p>ORIGIN: GENERAL UNIVERSITY HOSPITAL IN PRAGUE — ADMISSION RECORD</p>
          </article>

          <br />
          <p>---</p>
          <br />

          <article
            className="medical-report fade-stagger evidence-paper"
            aria-label="Medical report"
          >
            <h3>CLINICAL EXAMINATION RECORD</h3>
            <p>
              <strong>General University Hospital in Prague</strong> — 29 Oct 2025
            </p>

            <p>
              <strong>Patient:</strong> Unidentified adult male, approx. 40 years. Brought in by
              Prague Metropolitan Police after being found wandering near the Vltavská area.
              Presents with confusion and profound{" "}
              <Clue onFound={handleClueFound}>
                <strong>retrograde amnesia</strong>
              </Clue>{" "}
              — unable to recall name, occupation, or circumstances preceding discovery.
            </p>

            <p>
              <strong>Physical/Neurological:</strong> Alert, calm; vital signs within normal
              limits. Cranial nerves intact; coordination and reflexes normal. Marked temporal
              disorientation.
            </p>

            <p>
              <strong>Imaging/Dental:</strong> Healed femoral fracture stabilized by a{" "}
              <Clue onFound={handleClueFound}>
                <strong>Küntscher intramedullary nail — no longer used</strong>
              </Clue>{" "}
              in modern orthopedic practice. Oral exam shows{" "}
              <Clue onFound={handleClueFound}>
                <strong>amalgam fillings — withdrawn from medical use</strong>
              </Clue>{" "}
              (high mercury/nickel composition).
            </p>

            <p>
              <strong>Laboratory Findings:</strong> Routine panels unremarkable. Trace{" "}
              <strong>trichloroethylene metabolites</strong> and{" "}
              <Clue onFound={handleClueFound}>
                <strong>phenylmercuric compounds</strong>
              </Clue>{" "}
              — obsolete laboratory substances; no contemporary source identified.
            </p>

            <p>
              <strong>Assessment:</strong> Acute amnestic syndrome of undetermined origin.
              Objective findings indicate prior exposure to obsolete materials and techniques
              inconsistent with current medical standards.
            </p>

            <p>
              <em>Signed:</em> MUDr. Tomas Fischer, Chief Physician — 29 Oct 2025, 11:47&nbsp;CET
            </p>
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

export default MedicalRecordModal;
