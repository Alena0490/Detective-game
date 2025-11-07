import { useState, useEffect } from "react";
import type { FC } from "react";
import "./WinScreen.css";

interface WinScreenProps {
  cluesFound: number;
}

const WinScreen: FC<WinScreenProps> = ({ cluesFound }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Text
  const fullText = `The investigation confirms that the unknown man found in central Prague is not a contemporary missing person, but a survivor of the Line-0 incident from 29 October 1955. All available evidence connects him directly to the experimental metro project that was abruptly cancelled and erased from official records.

According to the old newspaper reports and military documentation, Line-0 was never meant to be a public transport line. It was a classified Cold War experiment combining high-voltage power transmission with military research beneath the city. On the night of the accident, the line suffered a critical power surge, reaching approximately four hundred percent of nominal voltage before the system collapsed. Several workers disappeared in the chaos, their names quietly removed from the record, their families given no answers.

The recovered plans and diary of engineer Antonín Richter reveal that the project leadership had been warned. Richter documented repeated anomalies in instrumentation, unexplained time offsets in monitoring equipment and orders from above to continue the tests despite rising risks. His last diary entry, written hours before the accident, suggests he expected “a permanent shift” rather than a simple technical failure. He appears to have understood that whatever was happening in Tunnel C was no longer just about electricity or transport.

The medical examination of the man found in 2025 shows treatment scars and procedures consistent with mid-20th-century medicine, including methods no longer used for decades. His clothing, watch and personal objects all match the period. None of his biometrics or identifiers appear in modern databases, and there is no evidence that he ever lived through the last seventy years. From his point of view, only a single night has passed since he entered the tunnel in 1955.

Witness testimony, especially Anna's recollection of the missing workers and the photograph from the same year, closes the loop. The man matches the description of one of the technicians who vanished after the accident. For seventy years, the official version spoke of an “infrastructure failure” and a project quietly cancelled. In reality, at least one person - and possibly more - was displaced far beyond their own time.

With no legal precedent and no clear scientific explanation, the case is formally closed as an historical incident with unresolved technical cause. The man from Line-0 will be registered under a new identity and placed under discreet observation. The surviving documents on the project have been sealed again, this time with an explicit note: continuation of similar experiments is not recommended.

The file on Line-0 is stamped “closed” and returned to the archive. Yet the existence of one displaced survivor raises an uncomfortable question that cannot be filed away: if the tunnel could throw one man seventy years into the future, it may not have been the only time it happened.`;


  useEffect(() => {
    // Small screens - no animation
    if (!window.matchMedia("(min-width: 351px)").matches) {
      setDisplayText(fullText);
      setIsComplete(true);
      return;
    }

    let i = 0;
    let timeoutId: number;

    const step = () => {
      i += 1;
      setDisplayText(fullText.slice(0, i));

      if (i >= fullText.length) {
        setIsComplete(true);
        return;
      }

      timeoutId = window.setTimeout(step, 35); // rychlost psaní
    };

    timeoutId = window.setTimeout(step, 50);

    return () => window.clearTimeout(timeoutId);
  }, [fullText]);

  return (
    <section className="win">     
      <header className="game-header" role="banner">
        <h1 className="case-title solved">Case solved</h1>
        <h2 className="clues-found">Clues found: {cluesFound}/40</h2>
      </header>
      <article className="intro-paper final-report">
        <h2>Final report</h2>
        <div className="typewriter-container">
          <p className="typewriter-text">
            {displayText}
            {!isComplete && <span className="cursor">|</span>}
          </p>
        </div>
      </article>
    </section>
  );
};

export default WinScreen;
