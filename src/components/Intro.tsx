import { useState, useEffect } from "react"
import "./Intro.css"

interface IntroProps {
  onStart: () => void;
}

const Intro = ({ onStart }: IntroProps) => {  
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const fullText = "An unknown man was found in the morning in central Prague. He appeared disoriented and unable to recall his name, origin, or any details of his past. No record of his identity exists, and no missing person report matches his description. Authorities have yet to determine his identity."

    useEffect(() => {
        // Fallback: na malých displejích neanimuj
        if (!window.matchMedia("(min-width: 351px)").matches) {
            setDisplayText(fullText);
            setIsComplete(true);
            setShowButton(true);
            return;
        }

        let i = 0;
        let rafId = 0;
        let nextAt = performance.now();
        let deleting = false;
        let deleteLeft = 0;

        // Globální multiplikátor rychlosti (nižší = rychlejší)
        // const GLOBAL = 0.68; // zrychlí vše o ~32 %

        // konzistentní „lidská“ náhoda (seed → stejné chování mezi reloady, ale ne robotické)
        let seed = 0x2f6e2b;
        const rand = () => {
            seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5;
            return (seed >>> 0) / 2 ** 32;
        };

        const cfg = {
            letter: [10, 20],        // běžné znaky
            space: [16, 40],         // mezery → chvilka na „přemýšlení“
            comma: [70, 140],
            period: [120, 220],      // . ! ? – delší zastávka
            wordPauseEvery: [3, 7],  // po X slovech dej mikro-pauzu
            wordPauseMs: [110, 320],
            typoProb: 0.025,         // cca 3,5 % znaků (jen písmena)
            typoBackspaceSpeed: [8, 1],
            burstSpeed: [0.85, 1.15] // občas zrychli/zpomal o pár %
        };

        let wordsTyped = 0;
        let wordsTarget = 3 + Math.floor(rand() * 6); // 3–8

        const pickDelay = (ch: string) => {
            const r = rand();
            const mul = cfg.burstSpeed[0] + r * (cfg.burstSpeed[1] - cfg.burstSpeed[0]);

            if (ch === ' ') {
            return lerp(cfg.space[0], cfg.space[1], rand()) * mul;
            }
            if (",;:–—".includes(ch)) {
            return lerp(cfg.comma[0], cfg.comma[1], rand()) * mul;
            }
            if (".!?".includes(ch)) {
            return lerp(cfg.period[0], cfg.period[1], rand()) * mul;
            }
            return lerp(cfg.letter[0], cfg.letter[1], rand()) * mul;
        };

        function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

        const randomLetter = (target: string) => {
            const pool = "abcdefghijklmnopqrstuvwxyz";
            let c = pool[Math.floor(rand() * pool.length)];
            if (rand() < 0.4) c = c.toUpperCase();
            if (c === target) c = pool[(pool.indexOf(c.toLowerCase()) + 1) % pool.length];
            return c;
        };

        const loop = (now: number) => {
            if (now < nextAt) { rafId = requestAnimationFrame(loop); return; }

            // Fáze mazání (opravujeme překlep)
            if (deleting) {
            if (deleteLeft > 0) {
                setDisplayText(prev => prev.slice(0, -1));
                deleteLeft--;
                nextAt = now + lerp(cfg.typoBackspaceSpeed[0], cfg.typoBackspaceSpeed[1], rand());
                rafId = requestAnimationFrame(loop);
                return;
            } else {
                deleting = false;
                // malá „pauza studu“ po opravě
                nextAt = now + lerp(80, 140, rand());
            }
            } else {
            // Píšeme další znak
            if (i < fullText.length) {
                const ch = fullText[i];
                // občasný překlep jen na písmena/číslice
                const isAlphaNum = /[A-Za-zÁ-ž0-9]/.test(ch);
                const willTypo = isAlphaNum && rand() < cfg.typoProb;

                if (willTypo) {
                // vlož špatný znak → krátká pauza → smaž → napiš správný
                const wrong = randomLetter(ch);
                setDisplayText(prev => prev + wrong);
                // naplánuj smazání dvou znaků (špatný + „nejistota“)
                deleting = true;
                deleteLeft = 1 + (rand() < 0.35 ? 1 : 0);
                // malá pauza, než si „všimne chyby“
                nextAt = now + lerp(70, 120, rand());
                } else {
                setDisplayText(prev => prev + ch);
                i++;

                // mikro-pauza po pár slovech
                if (ch === ' ') {
                    wordsTyped++;
                    if (wordsTyped >= wordsTarget) {
                    nextAt = now + lerp(cfg.wordPauseMs[0], cfg.wordPauseMs[1], rand());
                    wordsTyped = 0;
                    wordsTarget = 3 + Math.floor(rand() * 6);
                    } else {
                    nextAt = now + pickDelay(ch);
                    }
                } else {
                    nextAt = now + pickDelay(ch);
                }
                }

                rafId = requestAnimationFrame(loop);
                return;
            }
            }

            // Hotovo
            if (i >= fullText.length && !deleting) {
            setIsComplete(true);
            setTimeout(() => setShowButton(true), 350);
            return;
            }

            rafId = requestAnimationFrame(loop);
        };

        // start
        nextAt = performance.now() + 30;
        rafId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rafId);
        }, [fullText]);


    const handleStart = () => {
        const audio = new Audio('/sounds/mouse-click-290204.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log('Audio blocked:', e));
        
        onStart();
    };

    return (
        <section className="intro">
            <article className="intro-paper dense">
                <div className="typewriter-container">
                    <p className="typewriter-text">
                        {displayText}
                        {!isComplete && <span className="cursor">|</span>}
                    </p>
                </div>
                {showButton && (
                    <button 
                        className="cta-button pop-in"
                        onClick={handleStart}
                    >
                        Take the Case
                    </button>
                )}
            </article>
        </section>
    )
}

export default Intro