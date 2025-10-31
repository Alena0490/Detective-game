import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const NewspaperModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal newspaper-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newspaper-title"
      >
        <header className="modal-header">
          <h2 id="newspaper-title" className="modal-title">Old Newspaper</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
          
        </section>
      </article>
    </div>
  );
};

export default NewspaperModal;
