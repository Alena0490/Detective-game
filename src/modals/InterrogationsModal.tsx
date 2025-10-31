import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const InterrogationsModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal interrogations-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="interrogations-title"
      >
        <header className="modal-header">
          <h2 id="interrogations-title" className="modal-title">Witness Testimonies</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          
        </section>
      </article>
    </div>
  );
};

export default InterrogationsModal;
