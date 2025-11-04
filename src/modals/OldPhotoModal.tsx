import "./Modal.css";
import Clue from "../components/Clue";

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
};

/** Number of clue words inside this evidence text */
const TOTAL_CLUES = 4;

/**
 * OldPhotoModal
 * Evidence modal with a photograph and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const OldPhotoModal = ({
  open,
  onClose,
  // onEvidenceComplete, // will be used later for solving questions
  onClueFound,
  cluesFound,
}: ModalProps) => {
  if (!open) return null;

  /** Called when the player finds a clue word */
  const handleClueFound = () => {
    onClueFound?.();
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
        className="modal photo-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-title"
      >
        <header className="modal-header">
          <h2 id="photo-title" className="modal-title">
            Old Photo
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3>EVIDENCE ITEM — PHOTOGRAPH</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 07</p>
            <p>RECOVERED: 2025-11-01 / 15:26 CET</p>
            <p>
              ORIGIN: SEALED METAL CHEST — SUBSURFACE SITE / VLTAVSKÁ MAINTENANCE SECTOR
            </p>
          </article>

          <br />

          {/* Evidence content with interactive clues */}
          <article aria-label="Photograph description" className="fade-stagger">
            <h3>Photograph — Dr. Antonin Richter (circa 1955)</h3>
            <p>
              Black-and-white <strong>portrait photograph</strong>, approx. 3.5 × 5 cm,
              printed on matte paper.
              <br />
              Depicts a man in a <strong>formal suit and tie</strong>, facing forward in
              neutral lighting — consistent with{" "}
              <strong>identification or personnel documentation</strong>.
              <br />
              Below the image, a handwritten note reads:{" "}
              <Clue onFound={handleClueFound}>
                <strong>“Dr. Antonin Richter.”</strong>
              </Clue>
              <br />
              Reverse side blank; no institutional markings or stamps.
            </p>

            <br />

            <p>
              <strong>Police note:</strong> Facial recognition confirms{" "}
              <Clue onFound={handleClueFound}>
                a <strong>92 % match</strong>
              </Clue>{" "}
              with the unidentified male recovered on <strong>29 Oct 2025</strong> and the
              figure observed on{" "}
              <Clue onFound={handleClueFound}>
                <strong>Metro Camera 07</strong>
              </Clue>
              .
              <br />
              <Clue onFound={handleClueFound}>
                No record of any <strong>Dr. Antonin Richter</strong>
              </Clue>{" "}
              appears in current academic, medical, or military registries.
              <br />
              Document authenticity remains under forensic review.
            </p>

            {/* Clue counter for this evidence */}
            <p className="clue-status">
              Clues: {cluesFound} / {TOTAL_CLUES}
            </p>
          </article>
        </section>
      </article>
    </div>
  );
};

export default OldPhotoModal;
