import { useState, useEffect } from "react"
import "./Intro.css"

const Intro = () => {   
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const fullText = ""

    useEffect(() => {
        if (window.matchMedia("(min-width: 351px)").matches) {
            let idLetter = 1;
            // const delay = 100;

            const typeNextChar = () => {
        if (idLetter < fullText.length) {
          setIsTyping(true); // ← Spusť animaci rázu
          
          setDisplayText(fullText.slice(0, idLetter + 1));
          idLetter++;
          
          // Vypni animaci po 100ms
          setTimeout(() => setIsTyping(false), 100);
          
          const char = fullText[idLetter - 1];
          let delay;
          
          if (char === ' ') {
            delay = Math.random() * 100 + 150;
          } else if (char === ',' || char === '!' || char === '.') {
            delay = Math.random() * 150 + 200;
          } else {
            delay = Math.random() * 80 + 50;
          }
          
          setTimeout(typeNextChar, delay);
        } else {
          setIsComplete(true);
        }
      };

      typeNextChar();
    } else {
      setDisplayText(fullText);
      setIsComplete(true);
    }
  }, [])

    return (
        <section className="intro">
            <article>
                <div className="typewriter-container">
                    <p className={`typewriter-text ${isTyping ? 'typing-impact' : ''}`}>
                        {displayText}
                        {!isComplete && <span className="cursor">|</span>}
                    </p>
                </div>
                {isComplete && (
                    <button 
                    className="cta-button fade-in"
                    // onClick={}´
                    >
                        Solve mystery
                    </button>
                )}
            </article>
        </section>
    )
}

export default Intro