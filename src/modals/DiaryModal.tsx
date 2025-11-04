import "./Modal.css";
import Clue from "../components/Clue";

/**
 * ModalProps
 * - open: controls visibility of the modal
 * - onClose: closes the modal
 * - onEvidenceComplete: will be used later for solving questions under the text
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
 * DiaryModal
 * Evidence modal with interactive clue words.
 * Clues only affect the clue counters in MainGame,
 * they do NOT complete the evidence – that will be handled by questions later.
 */
const DiaryModal = ({
  open,
  onClose,
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
        className="modal diary-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diary-title"
      >
        <header className="modal-header">
          <h2 id="diary-title" className="modal-title">
            Old Diary
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3>EVIDENCE ITEM — NOTEBOOK</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 09</p>
            <p>RECOVERED: 2025-10-29 / 08:12 CET</p>
            <p>LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
          </article>

          <br />
          <p>---</p>
          <br />

          {/* Evidence content with interactive clues */}
          <article
            aria-label="Diary excerpt"
            className="evidence-paper fade-stagger"
          >
            <h3>Engineering Logbook (1955)</h3>
            <p>
              <em>
                Notebook contains multiple handwriting styles and initials,
                suggesting shared maintenance among project staff.
              </em>
            </p>

            <p>
              <strong>20 Oct — C.K.</strong>
              <br />
              Directive: Project <strong>L-0</strong> reclassified as{" "}
              <strong>military priority</strong>. Civilian staff restricted to
              clearance level 3. Test vehicle prepared for phase transit
              evaluation.
            </p>

            <p>
              <strong>24 Oct — C.K.</strong>
              <br />
              Calibration stable; velocity projections exceed{" "}
              <strong>900 km/h</strong>.{" "}
              <Clue onFound={handleClueFound}>
                <strong>Lt.Richter</strong>
              </Clue>{" "}
              assigned to{" "}
              <Clue onFound={handleClueFound}>
                <strong>test run scheduled for 29 Oct</strong>
              </Clue>
              . Field harmonics within tolerance. Objective: verify{" "}
              <strong>phase stability under live conditions</strong>.
            </p>

            <p>
              <strong>27 Oct — M.H.</strong>
              <br />
              Magnetic coupling irregular. Recommended delay. Command refused;
              activation confirmed for <strong>29 Oct 02:00</strong>. Safety
              note #47-D filed.
            </p>

            <p>
              <Clue onFound={handleClueFound}>
                <strong>29 Oct 1955 — A.R.</strong>
              </Clue>
              <br />
              00:47 — Final alignment complete. Vacuum pressure nominal.
              Oscillograph steady at 5.2 kV.
              <br />
              01:12 — Acceleration test initiated; cabin vibration increasing.
              <br />
              01:45 — Velocity stable at projected maximum. Reactor holding.
              <br />
              01:58 — Field distortion detected. Gauges overloading; magnetic
              containment fluctuating.
              <br />
              02:06 — Rapid uncontrolled acceleration. Signal interference
              rising — possible <strong>phase breach</strong>.
              <br />
              02:08 —{" "}
              <Clue onFound={handleClueFound}>
                Transmission field collapsing… attempting to—
              </Clue>
            </p>

            <p>
              <em>— Last entry ends abruptly. The remaining pages are blank.</em>
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

export default DiaryModal;
