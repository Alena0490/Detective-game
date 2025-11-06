import "./Modal.css";
import Clue from "../components/Clue";
import EvidenceQuiz from "../components/EvidenceQuiz";
import { getEvidenceQuestions } from "../components/EvidenceQuiz";

const EVIDENCE_KEY = "watch";

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
 * WatchModal
 * Evidence modal with a broken wristwatch and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const WatchModal = ({
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
        className="modal watch-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-title"
      >
        <header className="modal-header">
          <h2 id="watch-title" className="modal-title">
            Broken Watch
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3 className="capital">EVIDENCE ITEM — WRISTWATCH</h3>
            <p className="capital">CASE ID: PR-29-10-2025</p>
            <p className="capital">ITEM NO.: 08</p>
            <p className="capital">RECOVERED: 2025-10-29 / 08:12 CET</p>
            <p className="capital">
              LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED
            </p>

            <br />

            <p>
              <strong>Description:</strong>
            </p>
            {/* Evidence content with interactive clues */}
            <p>
              Silver mechanical wristwatch of{" "}
              <Clue onFound={handleClueFound}>mid-20th-century design</Clue>.
              <br />
              Movement intact but non-functional.
              <br />
              Hands{" "}
              <Clue onFound={handleClueFound}>
                stopped precisely at&nbsp;<strong>02:08</strong>
              </Clue>
              .
            </p>

            <p>
              <strong>Remarks:</strong>
            </p>
            <p>
              Item shows no signs of{" "}
              <Clue onFound={handleClueFound}>impact or&nbsp;external damage</Clue>.
              <br />
              Model discontinued in&nbsp;the&nbsp;1950s —{" "}
              <Clue onFound={handleClueFound}>
                <strong>manufacturer no&nbsp;longer active</strong>
              </Clue>
              .
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

export default WatchModal;
