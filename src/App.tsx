import { useState } from "react";
import Intro from "./components/Intro";
import MainGame from "./components/MainGame";
import WinScreen from "./components/WinScreen";

type Screen = "intro" | "office" | "win";

const App = () => {
  // const [screen, setScreen] = useState<Screen>("win");

  const [screen, setScreen] = useState<Screen>("intro");
  const [cluesFound, setCluesFound] = useState<number>(0);

  const resetGameStorage = () => {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key) continue;

      if (
        key.startsWith("amnesia:quizSolved:") ||
        key.startsWith("amnesia:clues") ||
        key.startsWith("amnesia:evidence")
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // ignore
  }
};

  const goToMainGame = () => setScreen("office");
  // const goToWin = () => setScreen("win"); 

    const handleWin = (cluesCount: number) => {
    setCluesFound(cluesCount);   // send to WinScreen
    resetGameStorage();          // restore localStorage
    setScreen("win");            // switch to Win
  };

  return (
    <div className="app-container">
      {screen === "intro" && (
        <div className="screen-fade">
          <Intro onStart={goToMainGame} />
        </div>
      )}
      
      {screen === "office" && (
        <div className="screen-fade">
          <MainGame onWin={handleWin} />
        </div>
      )}
      
      {screen === "win" && (
        <div className="screen-fade">
           <WinScreen cluesFound={cluesFound} />
        </div>
      )}
    </div>
  );
};

export default App;