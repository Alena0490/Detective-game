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
            <article>
                <h3>EVIDENCE ITEM — WITNESS TESTIMONIES</h3>
                <p>CASE ID: PR-29-10-2025</p>
                <p>ITEM NO.: 05</p>
                <p>RECORDED: 2025-10-30 to 2025-11-02</p>
                <p className="capital">Czech Federal Investigation Office — Special Operations Division</p>
            </article>
            <br/>
            <article>
                 <h3>Witness Statement #1 — Pavel Vrba (Metro Maintenance Technician, 47)</h3>
                <p><em>Recorded: 30 Oct 2025 / 11:15 CET — Station: Vltavská</em></p>

                <p>
                    I was on the night shift at <strong>Vltavska</strong> station.<br />
                    Shortly after two o'clock I felt a tremor under my feet — not like a passing train. The sound came <strong>from beneath the tunnel</strong>.<br />
                    The floor seams flashed — a <strong>blinding white light</strong> rose from below and lit the whole service corridor.<br />
                    A deep rumble followed, then a sharp crack and everything went dark. The warning panel showed an <strong>electrical surge over four times normal</strong> right before the system collapsed into a full <strong>power failure</strong>.<br />
                    The air smelled of <strong>ozone and burnt metal</strong>.<br />
                    When power was restored and we inspected the line, parts of the cabling were <strong>melted from the inside</strong> — the copper was glossy and the insulation had shrunk and blackened.<br />
                    I don’t know what happened down there, but the source had to be <strong>deep beneath us</strong>.<br />
                    In more than twenty years working in the metro, I’ve never seen anything like it.
                </p>

                <br/>
                <p>---</p>
                <br/>

                <h3>Witness Statement #2 — Unidentified Male (Hospitalized Subject, approx. age 40)</h3>
                <p><em>Statement recorded 31 Oct 2025 / 09:40 CET — General University Hospital, Prague</em></p>
                <p>Subject remains <strong>disoriented</strong> but cooperative.</p>  
        
                <p>Mentions involvement in a <strong>“field stabilization project”</strong> and repeatedly refers to <strong>“transit phase alignment”</strong> and a <strong>“test run”</strong> that was “about to begin.”</p>  
                <p>Appears <strong>confused by present-day technology</strong> and asked whether “<strong>the experiment succeeded</strong>.”  
                When informed of the current year, he expressed disbelief and insisted the date was “<strong>October 1955</strong>.”  
                Interview suspended after onset of acute stress reaction.</p>

                <br/>
                <p>---</p>
                <br/>

                <h3>Witness Statement #3 — Anna Blahova (Local Resident, 89)</h3>
                <p><em>Statement recorded 2 Nov 2025 / 14:05 CET</em></p>
                <p>Resident of Bubny district since birth. Remembers the area “<strong>changing overnight</strong>” in the 1950s when construction crews “<strong>blocked off the street and worked through the night</strong>.”  
                For many years afterward, she would sometimes hear <strong>a deep, distant rumbling underground</strong>, especially at night, “like heavy trains passing somewhere below.” </p> 
                <p>She recalls that about <strong>twenty or thirty years ago</strong> the sounds stopped completely, and the ground had been silent ever since.</p> 
                <p>During <strong>the night of 29 Oct 2025</strong> she couldn't sleep and observed a <strong>brief flash of light</strong> from the same direction.  
                Ends her statement saying: “They thought it was gone, but <strong>some doors never stay closed</strong>.”</p>
                <br/>
                <p>---</p>
                <br/>
                <p><strong>Police note:</strong> Testimonies collectively corroborate the timing of the <strong>02:08 event</strong>.  
                Statements from the <strong>technician</strong> and <strong>local resident</strong> reference unregistered underground activity beneath the Vltavská sector.  
                The unidentified male’s statement partially aligns with recovered documents from 1955 but remains <strong>inconclusive</strong> due to his mental condition.</p>
            </article>
        </section>
      </article>
    </div>
  );
};

export default InterrogationsModal;
