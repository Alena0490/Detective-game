import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const MilitaryPlansModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal map-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-title"
      >
        <header className="modal-header">
          <h2 id="map-title" className="modal-title">Military Plans</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          
        </section>
      </article>
    </div>
  );
};

export default MilitaryPlansModal;
