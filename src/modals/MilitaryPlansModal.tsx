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

const MilitaryPlansModal = ({ 
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
        className="modal map-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-title"
      >
        <header className="modal-header">
          <h2 id="map-title" className="modal-title">Military Plans</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          <article>
            <h3>EVIDENCE ITEM — MAP FRAGMENT (“LINE-0”)</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 03</p>
            <p>RECOVERED: 2025-11-01 / 15:26 CET</p>
            <p>ORIGIN: SEALED METAL CHEST — SUBSURFACE SITE / VLTAVSKÁ MAINTENANCE SECTOR</p>
            </article>
            <br/>
            <article aria-label="Map fragment" className="fade-stagger">
                <h3>Recovered Document — Transit Plan (circa 1955)</h3>
                <p>Folded paper map titled <Clue onFound={handleClueFound}><strong>“LINE-0”</strong></Clue>. Diagram shows a stand-alone underground alignment at a depth annotated below contemporary traction tunnels, with no junctions or interchange markings to existing lines. Notations reference <strong>“Sector D”</strong> but omit any municipal identifiers. Paper edges show heat exposure; type and symbols match <Clue onFound={handleClueFound}><strong>mid-1950s military cartography</strong></Clue>.</p>
                <p><strong>Police note:</strong> No official record of a <Clue onFound={handleClueFound}>route named <strong>“Line-0”</strong> exists</Clue>. The alignment depicted is <em>not connected</em> to the Prague metro network and is charted at a depth <Clue onFound={handleClueFound}><em>significantly below</em> known infrastructure.</Clue></p>
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

export default MilitaryPlansModal;
