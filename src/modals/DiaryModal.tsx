import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const DiaryModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal diary-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diary-title"
      >
        <header className="modal-header">
          <h2 id="diary-title" className="modal-title">Old Diary</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <h3>EVIDENCE ITEM — NOTEBOOK</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 09</p>
            <p>RECOVERED: 2025-10-29 / 08:12 CET</p>
            <p>LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
        </section>
      </article>
    </div>
  );
};

export default DiaryModal;
