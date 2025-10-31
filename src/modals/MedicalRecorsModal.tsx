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
        className="modal medical-record-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medical-record-title"
      >
        <header className="modal-header">
          <h2 id="medical-record-title" className="modal-title">Medical Record</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          
        </section>
      </article>
    </div>
  );
};

export default MedicalRecordModal;
