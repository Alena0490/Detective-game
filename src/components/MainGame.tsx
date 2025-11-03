import "./Maingame.css"
import { useEffect, useState, lazy, Suspense, useMemo } from "react";

import OldNewspaper from "../evidence/OldNewspaper";
import OldMilitaryPlans from "../evidence/OldMilitaryPlans";
import SubwayTicket from "../evidence/SubwayTicket";
import SecurityFootage from "../evidence/SecurityFootage";
import Interrogations from "../evidence/Interrogations";
import MedicalRecords from "../evidence/MedicalRecors";
import OldPhoto from "../evidence/OldPhoto"
import Watch from "../evidence/Watch";
import Diary from "../evidence/Diary";
import IncidentReport from "../evidence/IncidentReport";

type MainGameProps = {
  children?: React.ReactNode;
};

type ModalKey =
  | "newspaper" | "militaryPlans" | "ticket" | "security" | "interrogations"
  | "medical"   | "photo"         | "watch"  | "diary"    | "incident";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Zavolá se, když hráč splní všechny clues pro daný důkaz */
  onEvidenceComplete?: () => void;
  /** Volitelné – můžeš použít pro globální hlášku "clue found" */
  onClueFound?: () => void;
};

const MODALS: Record<ModalKey, React.LazyExoticComponent<React.ComponentType<ModalProps>>> = {
  newspaper:      lazy(() => import("../modals/NewspaperModal")),
  militaryPlans:  lazy(() => import("../modals/MilitaryPlansModal")),
  ticket:         lazy(() => import("../modals/SubwayTicketModal")),
  security:       lazy(() => import("../modals/SecurityFootageModal")),
  interrogations: lazy(() => import("../modals/InterrogationsModal")),
  medical:        lazy(() => import("../modals/MedicalRecorsModal")),
  photo:          lazy(() => import("../modals/OldPhotoModal")),
  watch:          lazy(() => import("../modals/WatchModal")),
  diary:          lazy(() => import("../modals/DiaryModal")),
  incident:       lazy(() => import("../modals/IncidentReportModal")),
};

// map, jestli je daný důkaz už kompletní
type EvidenceState = Record<ModalKey, boolean>;

const createInitialEvidenceState = (): EvidenceState => ({
  newspaper:      false,
  militaryPlans:  false,
  ticket:         false,
  security:       false,
  interrogations: false,
  medical:        false,
  photo:          false,
  watch:          false,
  diary:          false,
  incident:       false,
});

const MainGame: React.FC<MainGameProps> = ({ children }) => {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);
  const [evidenceState, setEvidenceState] = useState<EvidenceState>(
    () => createInitialEvidenceState()
  );
  const [clueMessage, setClueMessage] = useState<string | null>(null);

  // přepočet progressu z počtu hotových důkazů
  const progress = useMemo(() => {
    const total = Object.keys(evidenceState).length;
    const done = Object.values(evidenceState).filter(Boolean).length;
    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  }, [evidenceState]);

  const getProgressColor = (value: number) => {
    if (value <= 10) return "var(--color-danger)";
    if (value >= 90) return "var(--color-success)";
    return "var(--color-accent)";
  };

  useEffect(() => {
    const onClose = () => setOpenKey(null);
    window.addEventListener("modal:close", onClose);
    return () => window.removeEventListener("modal:close", onClose);
  }, []);

  const open = (k: ModalKey) => {
    setClueMessage(null);
    setOpenKey(k);
  };

  const handleEvidenceComplete = (key: ModalKey) => {
    setEvidenceState(prev => {
      if (prev[key]) return prev; // už je hotový → nic neměň
      return { ...prev, [key]: true };
    });
  };

  const handleClueFound = () => {

    setClueMessage("Clue found");
    // auto-vymazání po 2 vteřinách
    window.setTimeout(() => setClueMessage(null), 2000);
  };

  const ModalComp = openKey ? MODALS[openKey] : null;

  return (
    <div className="game-root">
      <header className="game-header" role="banner">
        <h1 className="case-title">Case 2510 - Amnesia</h1>

        <div className="progress-wrap" data-case="2510" >
          <progress
            style={{ "--progress-color": getProgressColor(progress) } as React.CSSProperties}
            max={100}
            value={progress}
          >
            <strong>Progress: {progress} % done.</strong>
          </progress>
          <p className="progress-label">
            {progress}% case completion
          </p>
          {clueMessage && (
            <p className="clue-message" aria-live="polite">
              {clueMessage}
            </p>
          )}
        </div>
      </header>

      <main id="main-evidence" className="game-main" role="main">
        <h2>Evidence Board</h2>
        <section id="board" className="board" aria-label="Evidence board">
          {children}

          <OldNewspaper
            onOpen={() => open("newspaper")}
            state={evidenceState.newspaper ? "verified" : "new"}
          />
          <OldMilitaryPlans
            onOpen={() => open("militaryPlans")}
            state={evidenceState.militaryPlans ? "verified" : "new"}
          />
          <SubwayTicket
            onOpen={() => open("ticket")}
            state={evidenceState.ticket ? "verified" : "new"}
          />
          <SecurityFootage
            onOpen={() => open("security")}
            state={evidenceState.security ? "verified" : "new"}
          />
          <Interrogations
            onOpen={() => open("interrogations")}
            state={evidenceState.interrogations ? "verified" : "new"}
          />
          <MedicalRecords
            onOpen={() => open("medical")}
            state={evidenceState.medical ? "verified" : "new"}
          />
          <OldPhoto
            onOpen={() => open("photo")}
            state={evidenceState.photo ? "verified" : "new"}
          />
          <Watch
            onOpen={() => open("watch")}
            state={evidenceState.watch ? "verified" : "new"}
          />
          <Diary
            onOpen={() => open("diary")}
            state={evidenceState.diary ? "verified" : "new"}
          />
          <IncidentReport
            onOpen={() => open("incident")}
            state={evidenceState.incident ? "verified" : "new"}
          />
        </section>
      </main>

      <footer className="game-footer" role="contentinfo" />

      {ModalComp && openKey && (
        <Suspense fallback={null}>
          <ModalComp
            open={true}
            onClose={() => setOpenKey(null)}
            onEvidenceComplete={() => handleEvidenceComplete(openKey)}
            onClueFound={handleClueFound}
          />
        </Suspense>
      )}
    </div>
  );
};

export default MainGame;
