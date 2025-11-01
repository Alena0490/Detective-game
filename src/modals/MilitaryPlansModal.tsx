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
          <article>
            <h3>EVIDENCE ITEM — MAP FRAGMENT (“LINE-0”)</h3>
            <p>CASE ID: PR-29-10-2025</p>
            <p>ITEM NO.: 03</p>
            <p>RECOVERED: 2025-11-01 / 15:26 CET</p>
            <p>ORIGIN: SEALED METAL CHEST — SUBSURFACE SITE / VLTAVSKÁ MAINTENANCE SECTOR</p>
            </article>
            <br/>
            <article aria-label="Map fragment" className="fade-stagger">
                <h3>Recovered Document — Transit Plan (circa 1955)</h3>
                <p>Folded paper map titled <strong>“LINE-0”</strong>. Diagram shows a stand-alone underground alignment at a depth annotated below contemporary traction tunnels, with no junctions or interchange markings to existing lines. Notations reference <strong>“Sector D”</strong> but omit any municipal identifiers. Paper edges show heat exposure; type and symbols match <strong>mid-1950s military cartography</strong>.</p>
                <p><strong>Police note:</strong> No official record of a route named <strong>“Line-0”</strong> exists. The alignment depicted is <em>not connected</em> to the Prague metro network and is charted at a depth <em>significantly below</em> known infrastructure.</p>
            </article>
        </section>
      </article>
    </div>
  );
};

export default MilitaryPlansModal;
