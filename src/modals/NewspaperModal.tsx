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

const NewspaperModal = ({  
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
        className="modal newspaper-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newspaper-title"
      >
        <header className="modal-header">
          <h2 id="newspaper-title" className="modal-title">Old Newspaper</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          <article>
                <h3>EVIDENCE ITEM — NEWSPAPER</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 01</p>
                <p>ACQUIRED: 2025-11-03 / 10:49 CET</p>
                <p>ORIGIN: NATIONAL ARCHIVE — PRAGUE / ISSUE DATED 1955-10-30</p>
            </article>
            <br/>
            <p>---</p>
            <br/>
            <article className="newspaper evidence-paper fade-stagger">
                <h3>Prague, Two Workers Are Missing</h3>
                <p><em><Clue onFound={handleClueFound}>October 30, 1955</Clue> – By a Staff Correspondent</em></p>
                <br/>
                <p>Prague – Two municipal workers are reported missing following a mysterious incident that occurred <strong>in the early hours of Saturday morning near the northern river embankment</strong>.</p>
                <br/>
                <p>According to initial statements, <Clue onFound={handleClueFound}><strong>a sudden and intense flash of light</strong></Clue> was seen over the area shortly <Clue onFound={handleClueFound}><strong>after 2 a.m.</strong></Clue> Several residents described it as “a silent lightning” that illuminated the streets for several seconds before vanishing. One woman claimed she felt “the windows tremble,” while another reported that “the air seemed to hum” moments before the light appeared.</p>
                <br/>
                <p>The men, both employed on night maintenance duty at a restricted construction site, failed to report to their supervisor. Their equipment was found neatly placed near an open shaft, with no sign of struggle or accident. Search efforts by police and rescue units yielded no results.</p>
                <br/>
                <p>Authorities have declined to provide details, referring to the matter as a <strong>“technical malfunction.”</strong> However, the area has since been sealed off, and uniformed personnel were observed patrolling the site on Saturday afternoon.</p>
                <br/>
                <p>Witnesses who attempted to photograph the scene were reportedly instructed to leave and refrain from speaking to the press. Officials maintain that the situation poses no threat to the public.</p>
                <br/>
                <p>Unconfirmed reports suggest that communication lines in the district briefly failed around the same time as the flash, though officials attribute this to routine maintenance.</p>
                <br/>
                <p>As of Sunday evening, the whereabouts of the missing men <Clue onFound={handleClueFound}><strong>remain unknown.</strong></Clue> No official explanation has been given.</p>
                <br/>
                <p><em>Editor’s note: Further inquiries directed to both the City Technical Office and the Ministry of Defense were met with no comment.</em></p>
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

export default NewspaperModal;
