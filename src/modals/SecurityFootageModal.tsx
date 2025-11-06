import "./Modal.css";
import Clue from "../components/Clue";
import EvidenceQuiz from "../components/EvidenceQuiz";
import { getEvidenceQuestions } from "../components/EvidenceQuiz";

const EVIDENCE_KEY = "security";

/**
 * ModalProps
 * - open: controls visibility of the modal
 * - onClose: closes the modal
 * - onEvidenceComplete: reserved for later (questions below the text)
 * - onClueFound: called when a single clue word is found
 * - cluesFound: how many clues for this evidence have been found so far
 */
type ModalProps = {
  open: boolean;
  onClose: () => void;
  onEvidenceComplete?: () => void;
  onClueFound?: () => void;
  cluesFound: number;
  evidenceSolved: boolean;
};

/** Number of clue words inside this evidence text */
const TOTAL_CLUES = 4;

/**
 * SecurityFootageModal
 * Evidence modal with metro security footage notes and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const SecurityFootageModal = ({
  open,
  onClose,
  onEvidenceComplete,
  onClueFound,
  cluesFound,
}: ModalProps) => {
  if (!open) return null;

  /** Called when the player finds a clue word */
  const handleClueFound = () => {
    onClueFound?.();
  };

  const questions = getEvidenceQuestions(EVIDENCE_KEY);

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <article
        className="modal footage-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="footage-title"
      >
        <header className="modal-header">
          <h2 id="footage-title" className="modal-title">
            Security Footage
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3 className="capital">EVIDENCE ITEM — SECURITY FOOTAGE</h3>
            <p className="capital">CASE ID: PR-29-10-2025</p>
            <p className="capital">ITEM NO.: 04</p>
            <p className="capital">ACQUIRED: 2025-11-02 / 11:49 CET</p>
            <p className="capital">
              ORIGIN: CITY METRO SECURITY — CAMERA 07 (Line&nbsp;C)
            </p>
          </article>

          <br />

          {/* Evidence content with interactive clues */}
          <article>
            <h3>Security Camera Recording</h3>
            <p>CAM: 07 — Line&nbsp;C / Maintenance Access Corridor</p>
            <p>DATE: 2025-10-29</p>
            <p>TIME: 03:00–03:30</p>

            <p>
              <strong>Notes:</strong>
            </p>
            <p>
              [03:12] SUBJECT OBSERVED EXITING{" "}
              <Clue onFound={handleClueFound}>LINE&nbsp;C SERVICE TUNNEL</Clue>.
              <br />
              SUBJECT LOOKS TOWARD CAMERA —{" "}
              <Clue onFound={handleClueFound}>APPEARS DISORIENTED</Clue>.
              <br />
              PROCEEDS NORTH TOWARD{" "}
              <Clue onFound={handleClueFound}>VLTAVSKÁ STATION</Clue>.
            </p>

            <p>
              TRACK SECTION CONFIRMED{" "}
              <Clue onFound={handleClueFound}>
                <strong>DE-ENERGIZED</strong>
              </Clue>{" "}
              AT TIME OF&nbsp;RECORDING.
            </p>

            {/* Clue counter for this evidence */}
            <p className="clue-status">
              Clues: {cluesFound} / {TOTAL_CLUES}
            </p>
          </article>
          <br />
          <p>---</p>
          <br />
            <EvidenceQuiz
              title="Question"
              questions={questions}
              onSolved={() => onEvidenceComplete?.()}
            />
        </section>
      </article>
    </div>
  );
};

export default SecurityFootageModal;
