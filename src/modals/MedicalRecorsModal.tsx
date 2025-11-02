import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const MedicalRecordModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal medical-record-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medical-record-title"
      >
        <header className="modal-header">
          <h2 id="medical-record-title" className="modal-title">Medical Record</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3>EVIDENCE ITEM — MEDICAL REPORT</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 06</p>
                <p>RECOVERED: 2025-10-29 / 10:55 CET</p>
                <p>ORIGIN: GENERAL UNIVERSITY HOSPITAL IN PRAGUE — ADMISSION RECORD</p>
            </article>
            <br/>
            <p>---</p>
            <br/>
            <article className="medical-report fade-stagger" aria-label="Medical report">
                <h3>CLINICAL EXAMINATION RECORD</h3>
                 <p><strong>General University Hospital in Prague</strong> — 29 Oct 2025</p>

                <p><strong>Patient:</strong> Unidentified adult male, approx. 40 years. Brought in by Prague Metropolitan Police after being found wandering near the Vltavská area. Presents with confusion and profound <strong>retrograde amnesia</strong> — unable to recall name, occupation, or circumstances preceding discovery.</p>

                <p><strong>Physical/Neurological:</strong> Alert, calm; vital signs within normal limits. Cranial nerves intact; coordination and reflexes normal. Marked temporal disorientation.</p>

                <p><strong>Imaging/Dental:</strong> Healed femoral fracture stabilized by a <strong>Küntscher intramedullary nail — no longer used</strong> in modern orthopedic practice. Oral exam shows <strong>amalgam fillings — withdrawn from medical use</strong> (high mercury/nickel composition).</p>

                <p><strong>Laboratory Findings:</strong> Routine panels unremarkable. Trace <strong>trichloroethylene metabolites</strong> and <strong>phenylmercuric compounds — obsolete laboratory substances</strong>; no contemporary source identified.</p>

                <p><strong>Assessment:</strong> Acute amnestic syndrome of undetermined origin. Objective findings indicate prior exposure to obsolete materials and techniques inconsistent with current medical standards.</p>

                <p><em>Signed:</em> MUDr. Tomas Fischer, Chief Physician — 29 Oct 2025, 11:47&nbsp;CET</p>

            </article>
          
        </section>
      </article>
    </div>
  );
};

export default MedicalRecordModal;
