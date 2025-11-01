import "./Modal.css";

type ModalProps = { open: boolean; onClose: () => void };

const IncidentReportModal = ({ open, onClose }: ModalProps) => {
  if (!open) return null;

  return (
    <div
        className="overlay"
        role="presentation"
        onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
        <article
            className="modal incident-report-modal card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="incident-report-title"
            tabIndex={1}
            >
            <header className="modal-header">
                <h2 id="incident-report-title" className="modal-title">Metro Incident Report</h2>
                <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
            </header>

            <div className="modal-body">
                <section>
                    <article>
                        <h3>EVIDENCE ITEM — INTERNAL INCIDENT REPORT</h3>
                        <p>CASE ID: PR-29-10-2025</p>
                        <p>ITEM NO.: 10</p>
                        <p>ACQUIRED: 2025-11-02 / 10:47 CET</p>
                        <p>ORIGIN: METROENGINEERING A.S. / INFRASTRUCTURE MAINTENANCE DIVISION</p>

                        <p><strong>Description:</strong></p>
                        <p>Printed internal report concerning an electrical surge event recorded on October&nbsp;29,&nbsp;2025.<br />
                        File obtained from Metroengineering servers during follow-up investigation.<br />
                        Includes timeline, technician statements, and partial damage assessment.</p>

                        <p><strong>Remarks:</strong></p>
                        <p>Document classified as <strong>INTERNAL USE ONLY</strong>.<br />
                        Recovered copy shows no digital watermark or revision data — source upload unverified.</p>
                    </article>
                    <br/>
                    <p>---</p>
                    <br/>
                    <article className="evidence-paper">
                        <section>
                            <h3>Incident Summary</h3>
                            <p>
                            At <strong>02:08 AM</strong> an unexpected <strong>energy surge</strong> affected
                            underground power lines near <strong>Line C</strong>. The event caused several
                            <strong> circuit failures</strong> and a brief fire in a maintenance corridor.
                            Power was rerouted to <strong>backup systems</strong> while traction power
                            remained <strong>offline</strong>.
                            </p>
                        </section>
                            <br/>
                        <section>
                            <h3>Timeline (CET)</h3>
                            <ul>
                            <li><strong>02:08</strong> — Surge detected; automatic suppression activated.</li>
                            <li><strong>02:10</strong> — Power rerouted; traction lines still offline.</li>
                            <li><strong>03:15</strong> — <strong>CCTV</strong> recorded<br/>a&nbsp;<strong>man</strong> emerging
                                from a&nbsp;<strong>service portal</strong> in&nbsp;a&nbsp;<em>de-energized tunnel</em>.</li>
                            <li><strong>04:15</strong> — Incident officially logged.</li>
                            </ul>
                        </section>
                            <br/>
                        <section>
                            <h3>Preliminary Findings</h3>
                            <ul>
                            <li>Overload originated from <strong>legacy wiring</strong> disconnected decades ago.</li>
                            <li>Voltage spike exceeded <strong>400&nbsp;%</strong> of&nbsp;normal range.</li>
                            <li>Residual <strong>electromagnetic fluctuation</strong> lasted several minutes.</li>
                            <li>Technicians noted a&nbsp;<strong>metallic odor</strong> near a&nbsp;<strong>sealed wall</strong>.</li>
                            </ul>
                        </section>
                            <br/>
                        <section>
                            <h3>Actions Taken</h3>
                            <ul>
                            <li>Rerouted power at&nbsp;<strong>02:08</strong>.</li>
                            <li>Damaged circuits isolated.</li>
                            <li>Environmental sensors reset at&nbsp;<strong>04:41</strong>.</li>
                            <li>Safety inspection scheduled: <strong>Oct&nbsp;30, 2025</strong>.</li>
                            </ul>
                        </section>
                            <br/>
                        <section className="evi-note" role="note">
                            <p>
                            <strong>Technician’s Note:</strong> “The surge didn’t behave like a&nbsp;typical short circuit.<br />
                It appeared and vanished almost instantly; readings went completely off-scale.<br />
                The&nbsp;pattern doesn’t match <strong>any known electrical failure.</strong>”

                            </p>
                        </section>
                            <br/>
                        <section className="evi-signatures" aria-label="Signatures">
                            <div className="sig">
                            <p><strong>P. Kral</strong><br /><small className="ink">Night Operations Supervisor</small><br />Filed: 05:15&nbsp;CET</p>
                            </div>
                            <div className="sig">
                            <p><strong>M. Hanak</strong><br /><small className="ink">Senior Facility Engineer</small><br />Approved: 05:22&nbsp;CET</p>
                            </div>
                        </section>
                    </article>      
                </section>
            </div>  
        </article>
    </div>
  );
};

export default IncidentReportModal;
