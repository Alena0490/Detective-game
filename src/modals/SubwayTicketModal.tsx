import "./Modal.css";
import Clue from "../components/Clue";
import EvidenceQuiz from "../components/EvidenceQuiz";
import { getEvidenceQuestions } from "../components/EvidenceQuiz";

const EVIDENCE_KEY = "ticket";

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
 * SubwayTicketModal
 * Evidence modal with a strange metro ticket and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const SubwayTicketModal = ({
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
        className="modal ticket-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
      >
        <header className="modal-header">
          <h2 id="ticket-title" className="modal-title">
            Subway Ticket
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3 className="capital">EVIDENCE ITEM — METRO TICKET</h3>
            <p className="capital">CASE ID: PR-29-10-2025</p>
            <p className="capital">ITEM NO.: 02</p>
            <p className="capital">RECOVERED: 2025-10-29 / 08:12 CET</p>
            <p className="capital">
              LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED
            </p>

            <br />

            <h3>Description:</h3>
            {/* Evidence content with interactive clues */}
            <p>
              Paper fare ticket,{" "}
              <Clue onFound={handleClueFound}>mid-20th-century</Clue> format.
              <br />
              Non-standard substrate; faint embedded lattice visible under oblique light.
              <br />
              Line:{" "}
              <Clue onFound={handleClueFound}>
                <strong>“Line-0”</strong>
              </Clue>{" "}
              —{" "}
              <em>
                unofficial / non-public;{" "}
                <Clue onFound={handleClueFound}>no&nbsp;record in&nbsp;municipal transit registry</Clue>
              </em>
              .
              <br />
              Serial: <strong className="capital">[REDACTED]</strong>.
            </p>

            <p>
              <strong>Remarks:</strong>
            </p>
            <p>
              Slight thermal discoloration;{" "}
              <Clue onFound={handleClueFound}>no&nbsp;charring or&nbsp;tearing observed</Clue>.
              <br />
              Ticket type discontinued; issuing authority not active / undocumented.
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

export default SubwayTicketModal;
