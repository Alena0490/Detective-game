import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const WatchModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal watch-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-title"
      >
        <header className="modal-header">
          <h2 id="watch-title" className="modal-title">Broken Watch</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3 className="capital">EVIDENCE ITEM — WRISTWATCH</h3>
                <p className="capital">CASE ID: PR-29-10-2025</p>
                <p className="capital">ITEM NO.: 08</p>
                <p className="capital">RECOVERED: 2025-10-29 / 08:12 CET</p>
                <p className="capital">LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
                <br/>
                <p><strong>Description:</strong></p>
                <p>Silver mechanical wristwatch of mid-20th-century design.<br />
                Movement intact but non-functional.<br />
                Hands stopped precisely at&nbsp;<strong>02:08</strong>.</p>

                <p><strong>Remarks:</strong></p>
                <p>Item shows no signs of&nbsp;impact or&nbsp;external damage.<br />
                Model discontinued in&nbsp;the&nbsp;1950s — <strong>manufacturer no&nbsp;longer active</strong>.</p>
            </article>
            </section>
      </article>
    </div>
  );
};

export default WatchModal;
