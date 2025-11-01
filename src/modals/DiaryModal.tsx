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
            <article>
                <h3>EVIDENCE ITEM — NOTEBOOK</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 09</p>
                <p>RECOVERED: 2025-10-29 / 08:12 CET</p>
                <p>LOCATION: PRAGUE CITY CENTER — MALE SUBJECT FOUND DISORIENTED</p>
            </article>
            <br/>
            <p>---</p>
            <br/>
            <article aria-label="Diary excerpt" className="evidence-paper fade-stagger">
                <h3>Engineering Logbook (1955)</h3>
                <p><em>Notebook contains multiple handwriting styles and initials, suggesting shared maintenance among project staff.</em></p>

                <p><strong>20 Oct — C.K.</strong><br/>
                Directive: Project <strong>L-0</strong> reclassified as <strong>military priority</strong>. Civilian staff restricted to clearance level 3. Test vehicle prepared for phase transit evaluation.</p>

                <p><strong>24 Oct — C.K.</strong><br/>
                Calibration stable; velocity projections exceed <strong>900 km/h</strong>. <strong>Sergeant Richter</strong> assigned to <strong>test run scheduled for 29 Oct</strong>. Field harmonics within tolerance. Objective: verify <strong>phase stability under live conditions</strong>.</p>

                <p><strong>27 Oct — M.H.</strong><br/>
                Magnetic coupling irregular. Recommended delay. Command refused; activation confirmed for <strong>29 Oct 02:00</strong>. Safety note #47-D filed.</p>

                <p><strong>29 Oct 1955 — A.R.</strong><br/>
                00:47 — Final alignment complete. Vacuum pressure nominal. Oscillograph steady at 5.2 kV.<br/>
                01:12 — Acceleration test initiated; cabin vibration increasing.<br/>
                01:45 — Velocity stable at projected maximum. Reactor holding.<br/>
                01:58 — Field distortion detected. Gauges overloading; magnetic containment fluctuating.<br/>
                02:06 — Rapid uncontrolled acceleration. Signal interference rising — possible <strong>phase breach</strong>.<br/>
                02:08 — Transmission field collapsing… attempting to—</p>

                <p><em>— Last entry ends abruptly. The remaining pages are blank.</em></p>
            </article>
        </section>
      </article>
    </div>
  );
};

export default DiaryModal;
