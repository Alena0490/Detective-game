import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const OldPhotoModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal photo-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-title"
      >
        <header className="modal-header">
          <h2 id="photo-title" className="modal-title">Old Photo</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3>EVIDENCE ITEM — PHOTOGRAPH</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 07</p>
                <p>RECOVERED: 2025-11-01 / 15:26 CET</p>
                <p>ORIGIN: SEALED METAL CHEST — SUBSURFACE SITE / VLTAVSKÁ MAINTENANCE SECTOR</p>
            </article>
            <br/>
            <article aria-label="Photograph description" className="fade-stagger">
                <h3>Photograph — Dr. Antonin Richter (circa 1955)</h3>
                <p>Black-and-white <strong>portrait photograph</strong>, approx. 3.5 × 5 cm, printed on matte paper.  
                Depicts a man in a <strong>formal suit and tie</strong>, facing forward in neutral lighting — consistent with <strong>identification or personnel documentation</strong>.  
                Below the image, a handwritten note reads: <strong>“Dr. Antonin Richter.”</strong>  
                Reverse side blank; no institutional markings or stamps.</p>
                <br/>
                <p><strong>Police note:</strong> Facial recognition confirms a <strong>92 % match</strong> with the unidentified male recovered on <strong>29 Oct 2025</strong> and the figure observed on <strong>Metro Camera 07</strong>.  
                No record of any <strong>Dr. Antonin Richter</strong> appears in current academic, medical, or military registries.  
                Document authenticity remains under forensic review.</p>
                </article>
        </section>
      </article>
    </div>
  );
};

export default OldPhotoModal;
