import "./Maingame.css"
import { useEffect, useState, lazy, Suspense } from "react";

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

// 🔑 jeden interní typ klíče – žádný extra soubor
type ModalKey =
  | "newspaper" | "militaryPlans" | "ticket" | "security" | "interrogations"
  | "medical"   | "photo"         | "watch"  | "diary"    | "incident";

// 🧭 lazy mapování klíče → modální komponenta (žádné hromadné importy)
type ModalProps = { open: boolean; onClose: () => void };

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

const MainGame: React.FC<MainGameProps> = ({ children }) => {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);
  const [progress, setProgress] = useState(80);

  const getProgressColor = (value: number) => {
    if (value <= 10) return 'var(--color-danger)';
    if (value >= 90) return 'var(--color-success)';
    return 'var(--color-accent)';
};

  // modál zavřeš uvnitř jeho X tlačítkem: window.dispatchEvent(new CustomEvent("modal:close"))
  useEffect(() => {
    const onClose = () => setOpenKey(null);
    window.addEventListener("modal:close", onClose);
    return () => window.removeEventListener("modal:close", onClose);
  }, []);

  const open = (k: ModalKey) => setOpenKey(k);

  // aktuální lazy komponenta modálu
  const ModalComp = openKey ? MODALS[openKey] : null;

  return (
    <div className="game-root">
      <header className="game-header" role="banner">
        <h1 className="case-title">Case 2510 - Amnesia</h1>
        <progress
          style={{ '--progress-color': getProgressColor(progress) } as React.CSSProperties}
          max="100" 
          value={progress}
        >
          <strong>Progress: {progress} % done.</strong>
        </progress>
      </header>

      <main id="main-evidence" className="game-main" role="main">
        <h2>Evidence Board</h2>
        <section id="board" className="board" aria-label="Evidence board">
          {children}
          <OldNewspaper     onOpen={() => open("newspaper")} />
          <OldMilitaryPlans onOpen={() => open("militaryPlans")} />
          <SubwayTicket     onOpen={() => open("ticket")} />
          <SecurityFootage  onOpen={() => open("security")} />
          <Interrogations   onOpen={() => open("interrogations")} />
          <MedicalRecords   onOpen={() => open("medical")} />
          <OldPhoto         onOpen={() => open("photo")} />
          <Watch            onOpen={() => open("watch")} />
          <Diary            onOpen={() => open("diary")} />
          <IncidentReport   onOpen={() => open("incident")} />
        </section>
      </main>

      <footer className="game-footer" role="contentinfo" />

      {ModalComp && (
        <Suspense fallback={null}>
          <ModalComp open={true} onClose={() => setOpenKey(null)} />
        </Suspense>
      )}
    </div>
  );
};

export default MainGame;
