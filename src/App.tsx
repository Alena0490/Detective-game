import { useState } from "react";
import Intro from "./components/Intro";
import MainGame from "./components/MainGame";
import WinScreen from "./components/WinScreen";

type Screen = "intro" | "office" | "win";

const App = () => {
    const [screen] = useState<Screen>("office"); 

  if (screen === "intro") return <Intro />;   // přidat přepnutí
  if (screen === "win")   return <WinScreen />;
  return <MainGame />;                         // "office"
};

export default App;
