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
const TOTAL_CLUES = 4; // "LINE-0", mid-1950s cartography, missing official record, depth below known infrastructure

/**
 * MilitaryPlansModal
 * Evidence modal with a map fragment and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const MilitaryPlansModal = ({
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
        className="modal map-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-title"
      >
        <header className="modal-header">
          <h2 id="map-title" className="modal-title">
            Military Plans
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3>EVIDENCE ITEM — MAP FRAGMENT (“LINE-0”)</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 03</p>
            <p>RECOVERED: 2025-11-01 / 15:26 CET</p>
            <p>
              ORIGIN: SEALED METAL CHEST — SUBSURFACE SITE / VLTAVSKÁ MAINTENANCE SECTOR
            </p>
          </article>

          <br />

          {/* Evidence content with interactive clues */}
          <article aria-label="Map fragment" className="fade-stagger">
            <h3>Recovered Document — Transit Plan (circa 1955)</h3>
            <p>
              Folded paper map titled{" "}
              <Clue onFound={handleClueFound}>
                <strong>“LINE-0”</strong>
              </Clue>
              . Diagram shows a stand-alone underground alignment at a depth annotated
              below contemporary traction tunnels, with no junctions or interchange
              markings to existing lines. Notations reference <strong>“Sector D”</strong>{" "}
              but omit any municipal identifiers. Paper edges show heat exposure; type and
              symbols match{" "}
              <Clue onFound={handleClueFound}>
                <strong>mid-1950s military cartography</strong>
              </Clue>
              .
            </p>

            <p>
              <strong>Police note:</strong> No official record of a{" "}
              <Clue onFound={handleClueFound}>
                route named <strong>“Line-0”</strong> exists
              </Clue>
              . The alignment depicted is <em>not connected</em> to the Prague metro
              network and is charted at a depth{" "}
              <Clue onFound={handleClueFound}>
                <em>significantly below</em> known infrastructure.
              </Clue>
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

export default MilitaryPlansModal;
