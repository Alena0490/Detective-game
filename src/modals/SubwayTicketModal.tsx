import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const SubwayTicketModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="overlay"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <article
        className="modal ticket-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-title"
      >
        <header className="modal-header">
          <h2 id="ticket-title" className="modal-title">Subway Ticket</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="modal-body">
            <article>
                <h3>EVIDENCE ITEM — METRO TICKET</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 02</p>
                <p>RECOVERED: 2025-10-29 / 08:12 CET</p>
                <p>LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>

                <p><strong>Description:</strong></p>
                <p>Paper fare ticket, mid-20th-century format.<br />
                Non-standard substrate; faint embedded lattice visible under oblique light.<br />
                Line: <strong>“Line-0”</strong> — <em>unofficial / non-public; no&nbsp;record in&nbsp;municipal transit registry</em>.<br />
                Serial: <strong>[REDACTED]</strong>.</p>

                <p><strong>Remarks:</strong></p>
                <p>Slight thermal discoloration; no&nbsp;charring or&nbsp;tearing observed.<br />
                Ticket type discontinued; issuing authority not active / undocumented.</p>
            </article>
            </section>
      </article>
    </div>
  );
};

export default SubwayTicketModal;
