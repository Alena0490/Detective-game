import "./Maingame.css";
import {
  useEffect,
  useState,
  lazy,
  Suspense,
  useMemo,
  type CSSProperties,
  type ReactNode,
  type FC,
} from "react";

import OldNewspaper from "../evidence/OldNewspaper";
import OldMilitaryPlans from "../evidence/OldMilitaryPlans";
import SubwayTicket from "../evidence/SubwayTicket";
import SecurityFootage from "../evidence/SecurityFootage";
import Interrogations from "../evidence/Interrogations";
import MedicalRecords from "../evidence/MedicalRecors";
import OldPhoto from "../evidence/OldPhoto";
import Watch from "../evidence/Watch";
import Diary from "../evidence/Diary";
import IncidentReport from "../evidence/IncidentReport";

type MainGameProps = {
  children?: ReactNode;
    onWin: (cluesFound: number) => void;
};

type ModalKey =
  | "newspaper"
  | "militaryPlans"
  | "ticket"
  | "security"
  | "interrogations"
  | "medical"
  | "photo"
  | "watch"
  | "diary"
  | "incident";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onEvidenceComplete?: () => void;
  onClueFound?: () => void;
  cluesFound: number;
  evidenceSolved: boolean;
};

const MODALS: Record<
  ModalKey,
  React.LazyExoticComponent<React.ComponentType<ModalProps>>
> = {
  newspaper: lazy(() => import("../modals/NewspaperModal")),
  militaryPlans: lazy(() => import("../modals/MilitaryPlansModal")),
  ticket: lazy(() => import("../modals/SubwayTicketModal")),
  security: lazy(() => import("../modals/SecurityFootageModal")),
  interrogations: lazy(() => import("../modals/InterrogationsModal")),
  medical: lazy(() => import("../modals/MedicalRecorsModal")),
  photo: lazy(() => import("../modals/OldPhotoModal")),
  watch: lazy(() => import("../modals/WatchModal")),
  diary: lazy(() => import("../modals/DiaryModal")),
  incident: lazy(() => import("../modals/IncidentReportModal")),
};

// evidence completion
type EvidenceState = Record<ModalKey, boolean>;

const createInitialEvidenceState = (): EvidenceState => ({
  newspaper: false,
  militaryPlans: false,
  ticket: false,
  security: false,
  interrogations: false,
  medical: false,
  photo: false,
  watch: false,
  diary: false,
  incident: false,
});

// clues per evidence (x/4 )
type CluesState = Record<ModalKey, number>;

const createInitialCluesState = (): CluesState => ({
  newspaper: 0,
  militaryPlans: 0,
  ticket: 0,
  security: 0,
  interrogations: 0,
  medical: 0,
  photo: 0,
  watch: 0,
  diary: 0,
  incident: 0,
});

const LS_KEY_CLUES = "amnesia:clues"; // localStorage key for clues state
const LS_KEY_EVIDENCE = "amnesia:evidence";


const TOTAL_CLUES_GLOBAL = 40;
const CLUES_PER_EVIDENCE = 4;

const MainGame: FC<MainGameProps> = ({ children, onWin  }) => {
  const [openKey, setOpenKey] = useState<ModalKey | null>(null);

  const [evidenceState, setEvidenceState] = useState<EvidenceState>(() => {
    const base = createInitialEvidenceState();

    if (typeof window === "undefined") {
      return base;
    }

    try {
      const raw = window.localStorage.getItem(LS_KEY_EVIDENCE);
      if (!raw) return base;

      const parsed = JSON.parse(raw) as Partial<EvidenceState>;
      return { ...base, ...parsed };
    } catch {
      return base;
    }
  });


  // load cluesState from localStorage (once, on mount)
  const [cluesState, setCluesState] = useState<CluesState>(() => {
    const base = createInitialCluesState();

    if (typeof window === "undefined") {
      return base;
    }

    try {
      const raw = window.localStorage.getItem(LS_KEY_CLUES);
      if (!raw) return base;

      const parsed = JSON.parse(raw) as Partial<CluesState>;
      return { ...base, ...parsed };
    } catch {
      return base;
    }
  });

  // persist cluesState + evidenceState into localStorage whenever either changes
  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY_CLUES, JSON.stringify(cluesState));
      window.localStorage.setItem(LS_KEY_EVIDENCE, JSON.stringify(evidenceState));
    } catch {
      // ignore storage errors (private mode etc.)
    }
  }, [cluesState, evidenceState]);


  // derived global count of all clues found
  const totalCluesFound = useMemo(
    () => Object.values(cluesState).reduce((sum, n) => sum + n, 0),
    [cluesState]
  );

  // global hint message "Clue found"
  const [clueMessage, setClueMessage] = useState<string | null>(null);

  // progress from completed evidences (NOT from clues)
  const progress = useMemo(() => {
    const total = Object.keys(evidenceState).length;
    const done = Object.values(evidenceState).filter(Boolean).length;
    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  }, [evidenceState]);

    useEffect(() => {
    if (progress === 100) {
      onWin(totalCluesFound); // pošle do App počet nalezených clues
    }
  }, [progress, totalCluesFound, onWin]);

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
    setEvidenceState((prev) => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  };

  // called from modals when a clue is found
  const handleClueFoundForModal = (key: ModalKey) => {
    setCluesState((prev) => {
      const current = prev[key] ?? 0;
      const next = Math.min(current + 1, CLUES_PER_EVIDENCE);
      if (next === current) return prev;
      return { ...prev, [key]: next };
    });

    setClueMessage("Clue found");
    window.setTimeout(() => setClueMessage(null), 1500);
  };

  const ModalComp = openKey ? MODALS[openKey] : null;

  return (
    <div className="game-root">
      <header className="game-header" role="banner">
        <h1 className="case-title">Case 2510 - Amnesia</h1>

        <div className="progress-wrap" data-case="2510">
          <progress
            style={
              { "--progress-color": getProgressColor(progress) } as CSSProperties
            }
            max={100}
            value={progress}
          >
            <strong>Progress: {progress} % done.</strong>
          </progress>

          <p className="progress-label">{progress}&nbsp;% case completion</p>

          <p className="clue-counter">
            Clues found: {totalCluesFound} / {TOTAL_CLUES_GLOBAL}
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
             completed={evidenceState.newspaper}
          />
          <OldMilitaryPlans
            onOpen={() => open("militaryPlans")}
            state={evidenceState.militaryPlans ? "verified" : "new"}
             completed={evidenceState.militaryPlans}
          />
          <SubwayTicket
            onOpen={() => open("ticket")}
            state={evidenceState.ticket ? "verified" : "new"}
             completed={evidenceState.ticket}
          />
          <SecurityFootage
            onOpen={() => open("security")}
            state={evidenceState.security ? "verified" : "new"}
             completed={evidenceState.security}
          />
          <Interrogations
            onOpen={() => open("interrogations")}
            state={evidenceState.interrogations ? "verified" : "new"}
             completed={evidenceState.interrogations}
          />
          <MedicalRecords
            onOpen={() => open("medical")}
            state={evidenceState.medical ? "verified" : "new"}
             completed={evidenceState.medical}
          />
          <OldPhoto
            onOpen={() => open("photo")}
            state={evidenceState.photo ? "verified" : "new"}
             completed={evidenceState.photo}
          />
          <Watch
            onOpen={() => open("watch")}
            state={evidenceState.watch ? "verified" : "new"}
             completed={evidenceState.watch}
          />
          <Diary
            onOpen={() => open("diary")}
            state={evidenceState.diary ? "verified" : "new"}
            completed={evidenceState.diary}
          />
          <IncidentReport
            onOpen={() => open("incident")}
            state={evidenceState.incident ? "verified" : "new"}
            completed={evidenceState.incident}
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
            onClueFound={() => handleClueFoundForModal(openKey)}
            cluesFound={cluesState[openKey] ?? 0}
            evidenceSolved={evidenceState[openKey] ?? false}
          />
        </Suspense>
      )}
    </div>
  );
};

export default MainGame;
