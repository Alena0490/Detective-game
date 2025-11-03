import React, { useState } from "react";
import "./Clue.css"

type ClueProps = {
  onFound: () => void;
  children: React.ReactNode;
};

const Clue: React.FC<ClueProps> = ({ onFound, children }) => {
  const [found, setFound] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (found) return; // nechceme spamovat hláškou/přičítat vícekrát
    setFound(true);
    onFound();
  };

  return (
    <button
      type="button"
      className={`clue-word ${found ? "clue-word--found" : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Clue;



