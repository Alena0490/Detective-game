import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const SecurityFootageModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal footage-modal card noir-ca-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="footage-title"
      >
        <header className="modal-header">
          <h2 id="footage-title" className="modal-title">Security Footage</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3 className="capital">EVIDENCE ITEM — SECURITY FOOTAGE</h3>
                <p className="capital">CASE ID: PR-29-10-2025</p>
                <p className="capital">ITEM NO.: 04</p>
                <p className="capital">ACQUIRED: 2025-11-02 / 11:49 CET</p>
                <p className="capital">ORIGIN: CITY METRO SECURITY — CAMERA 07 (Line&nbsp;C)</p>
            </article>
            <br/>
            <article>
                <h3>Security Camera Recording</h3>
                <p>CAM: 07 — Line&nbsp;C / Maintenance Access Corridor</p>
                <p>DATE: 2025-10-29</p>
                <p>TIME: 03:00-03:30</p>

                <p><strong>Notes:</strong></p>
                <p>[03:12] SUBJECT OBSERVED EXITING LINE&nbsp;C SERVICE TUNNEL.<br />
                SUBJECT LOOKS TOWARD CAMERA — APPEARS DISORIENTED.<br />
                PROCEEDS NORTH TOWARD VLTAVSKÁ STATION.</p>

                <p>TRACK SECTION CONFIRMED <strong>DE-ENERGIZED</strong> AT TIME OF&nbsp;RECORDING.</p>
            </article>
        </section>
      </article>
    </div>
  );
};

export default SecurityFootageModal;
