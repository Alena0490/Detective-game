import "./Modal.css";
import Clue from "../components/Clue";
import EvidenceQuiz from "../components/EvidenceQuiz";
import { getEvidenceQuestions } from "../components/EvidenceQuiz";

const EVIDENCE_KEY = "interrogations";


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
 * InterrogationsModal
 * Evidence modal with witness testimonies and interactive clue words.
 * Clues only affect the clue counters in MainGame.
 * Completing the evidence will be handled later via questions, not via clues.
 */
const InterrogationsModal = ({
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
        className="modal interrogations-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="interrogations-title"
      >
        <header className="modal-header">
          <h2 id="interrogations-title" className="modal-title">
            Witness Testimonies
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <section className="modal-body">
          {/* Evidence metadata */}
          <article>
            <h3>EVIDENCE ITEM — WITNESS TESTIMONIES</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 05</p>
            <p>RECORDED: 2025-10-30 to 2025-11-02</p>
            <p className="capital">
              Czech Federal Investigation Office — Special Operations Division
            </p>
          </article>

          <br />
          {/* Evidence content with interactive clues */}
          <article className="fade-stagger">
            <h3>
              Witness Statement #1 — Pavel Vrba (Metro Maintenance Technician, 47)
            </h3>
            <p>
              <em>Recorded: 30 Oct 2025 / 11:15 CET — Station: Vltavská</em>
            </p>

            <p>
              I was on the night shift at <strong>Vltavska</strong> station.
              <br />
              Shortly after two o&apos;clock I felt a tremor under my feet — not like a
              passing train. The sound came{" "}
              <Clue onFound={handleClueFound}>
                <strong>from beneath the tunnel</strong>
              </Clue>
              .
              <br />
              The floor seams flashed — a <strong>blinding white light</strong> rose from
              below and lit the whole service corridor.
              <br />
              A deep rumble followed, then a sharp crack and everything went dark. The
              warning panel showed an <strong>electrical surge over four times normal</strong>{" "}
              right before the system collapsed into a full <strong>power failure</strong>.
              <br />
              The air smelled of <strong>ozone and burnt metal</strong>.
              <br />
              When power was restored and we inspected the line, parts of the cabling were{" "}
              <strong>melted from the inside</strong> — the copper was glossy and the
              insulation had shrunk and blackened.
              <br />
              I don’t know what happened down there, but the source had to be{" "}
              <strong>deep beneath us</strong>.
              <br />
              In more than twenty years working in the metro, I’ve never seen anything
              like it.
            </p>

            <br />
            <p>---</p>
            <br />

            <h3>
              Witness Statement #2 — Unidentified Male (Hospitalized Subject, approx. age
              40)
            </h3>
            <p>
              <em>
                Statement recorded 31 Oct 2025 / 09:40 CET — General University Hospital,
                Prague
              </em>
            </p>
            <p>Subject remains <strong>disoriented</strong> but cooperative.</p>

            <p>
              Mentions involvement in a{" "}
              <strong>&quot;field stabilization project&quot;</strong> and repeatedly
              refers to <strong>&quot;transit phase alignment&quot;</strong> and a{" "}
              <Clue onFound={handleClueFound}>
                <strong>&quot;test run&quot;</strong>
              </Clue>{" "}
              that was &quot;about to begin.&quot;
            </p>
            <p>
              Appears <strong>confused by present-day technology</strong> and asked
              whether &quot;<strong>the experiment succeeded</strong>.&quot;
              <br />
              When informed of the current year, he expressed disbelief and insisted the
              date was &quot;
              <strong>
                <Clue onFound={handleClueFound}>October 1955</Clue>
              </strong>
              .&quot;
              <br />
              Interview suspended after onset of acute stress reaction.
            </p>

            <br />
            <p>---</p>
            <br />

            <h3>Witness Statement #3 — Anna Blahova (Local Resident, 89)</h3>
            <p>
              <em>Statement recorded 2 Nov 2025 / 14:05 CET</em>
            </p>
            <p>
              Resident of Bubny district since birth. Remembers the area “
              <strong>changing overnight</strong>” in the 1950s when construction crews “
              <strong>blocked off the street and worked through the night</strong>.”
              <br />
              For many years afterward, she would sometimes hear{" "}
              <strong>a deep, distant rumbling underground</strong>, especially at night,{" "}
              <Clue onFound={handleClueFound}>
                “like heavy trains passing somewhere below.”
              </Clue>
            </p>
            <p>
              She recalls that about <strong>twenty or thirty years ago</strong> the
              sounds stopped completely, and the ground had been silent ever since.
            </p>
            <p>
              During <strong>the night of 29 Oct 2025</strong> she couldn&apos;t sleep and
              observed a <strong>brief flash of light</strong> from the same direction.
              <br />
              Ends her statement saying: “They thought it was gone, but{" "}
              <strong>some doors never stay closed</strong>.”
            </p>

            <br />
            <p>---</p>
            <br />

            <p>
              <strong>Police note:</strong> Testimonies collectively corroborate the
              timing of the <strong>02:08 event</strong>.
              <br />
              Statements from the <strong>technician</strong> and{" "}
              <strong>local resident</strong> reference unregistered underground activity
              beneath the Vltavská sector.
              <br />
              The unidentified male’s statement partially aligns with recovered documents
              from 1955 but remains <strong>inconclusive</strong> due to his mental
              condition.
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

export default InterrogationsModal;
