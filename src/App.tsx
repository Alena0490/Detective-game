import { useState } from "react";
import Intro from "./components/Intro";
import MainGame from "./components/MainGame";
import WinScreen from "./components/WinScreen";

type Screen = "intro" | "office" | "win";

const App = () => {
  const [screen, setScreen] = useState<Screen>("intro");

  const goToMainGame = () => setScreen("office");
  // const goToWin = () => setScreen("win"); // Pro pozdější použití

  return (
    <div className="app-container">
      {screen === "intro" && (
        <div className="screen-fade">
          <Intro onStart={goToMainGame} />
        </div>
      )}
      
      {screen === "office" && (
        <div className="screen-fade">
          <MainGame />
        </div>
      )}
      
      {screen === "win" && (
        <div className="screen-fade">
          <WinScreen />
        </div>
      )}
    </div>
  );
};

export default App;