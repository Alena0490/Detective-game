/* eslint-disable react-refresh/only-export-components */
import { useState, type FormEvent } from "react";
import "./EvidenceQuiz.css";

export type QuestionKind = "text" | "number" | "year" | "time";

export type QuizQuestion = {
  id: string;
  label: string;
  placeholder?: string;
  kind?: QuestionKind;
  correctAnswers: string[];
  options?: string[]; 
};

export type EvidenceKey =
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

export const evidenceQuizMap: Record<EvidenceKey, QuizQuestion[]> = {
  // EXPORT IN MODAL
  newspaper: [
    {
      id: "newspaper-witness-first-name",
      label:
        "What is the first name of the woman who told the police about the events in 1955?",
      kind: "text",
      placeholder: "First name",
      correctAnswers: ["anna"],
    },
  ],

  ticket: [
    {
      id: "ticket-max-speed",
      label:
        "What is the highest speed the metro was supposed to travel?",
      kind: "number",
      placeholder: "Line-0 maximum speed",
      correctAnswers: ["900"],
    },
  ],

  militaryPlans: [
    {
      id: "map-metro-open-year",
      label:
        "According to the map, in which year was the metro officially opened?",
      kind: "year",
      placeholder: "Year",
      correctAnswers: ["1974"],
    },
  ],

  security: [
    {
      id: "security-time-on-camera",
      label:
        "At what time does the subject first appear on camera in the security footage?",
      kind: "time",
      placeholder: "Time",
      correctAnswers: ["03:12"],
    },
  ],

  interrogations: [
    {
      id: "testimonies-event-year",
      label:
        "In what year did the event occur that Anna connects to the current case?",
      kind: "year",
      placeholder: "Year",
      correctAnswers: ["1955"],
    },
  ],

 medical: [
  {
    id: "medical-biggest-issue",
    label: "What is the main problem with the man's medical results?",
    kind: "text",
    options: [
      "His blood pressure is too low",
      "He underwent treatments that are no longer used in current medicine",
      "He has no visible injuries"
    ],
    correctAnswers: [
      "He underwent treatments that are no longer used in current medicine"
    ]
  }
],

  photo: [
    {
      id: "photo-year",
      label: "Which year on the photo connects it to Anna's story?",
      kind: "year",
      placeholder: "Year",
      correctAnswers: ["1955"],
    },
  ],

  watch: [
  {
    id: "watch-where-found",
    label: "Where was the watch found?",
    kind: "text",
    options: [
      "On the ground near the tracks",
      "With the man",
      "Inside the control room"
    ],
    correctAnswers: ["With the man"],
  },
],

  diary: [
    {
      id: "diary-full-name",
      label:
        "What is the full name of the man who made the last record in the diary?",
      kind: "text",
      placeholder: "Full name",
      correctAnswers: ["antonin richter", "antonín richter", "antoninrichter"],
    },
  ],

  incident: [
    {
      id: "incident-voltage-spike",
      label:
        "What percentage of the normal voltage did the power reach during the spike?",
      kind: "number",
      placeholder: "Value (e.g. 400)",
      correctAnswers: ["400"],
    },
  ],
};

export const getEvidenceQuestions = (key: EvidenceKey): QuizQuestion[] =>
  evidenceQuizMap[key] ?? [];

const normalizeText = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const normalizeForQuestion = (value: string, kind: QuestionKind = "text") => {
  const v = value.trim();
  if (!v) return "";
  switch (kind) {
    case "number":
    case "year":
      return v.replace(/\D+/g, "");
    case "time":
      return v.replace(/\D+/g, "").padStart(4, "0");
    case "text":
    default:
      return normalizeText(v);
  }
};

const getInputType = (kind: QuestionKind = "text"): "text" | "number" | "time" => {
  if (kind === "number" || kind === "year") return "number";
  if (kind === "time") return "time";
  return "text";
};

type EvidenceQuizProps = {
  title?: string;
  questions: QuizQuestion[];
  onSolved: () => void;
};

const EvidenceQuiz = ({
  title = "Evidence questions",
  questions,
  onSolved,
}: EvidenceQuizProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    for (const q of questions) {
      const kind = q.kind ?? "text";
      const rawValue = answers[q.id] ?? "";
      const userValue = normalizeForQuestion(rawValue, kind);

      if (!userValue) {
        setError("Please answer all questions.");
        return;
      }

      const isCorrect = q.correctAnswers
        .map((a) => normalizeForQuestion(a, kind))
        .some((correct) => correct === userValue);

      if (!isCorrect) {
        setError("One or more answers are incorrect. Try again.");
        return;
      }
    }

    setSolved(true);
    onSolved();
  };

  return (
    <section className="evidence-quiz">
      <h3 className="evidence-quiz-title">{title}</h3>

      {solved && (
        <p className="evidence-quiz-success">
          Evidence solved. Your answers are correct.
        </p>
      )}

      {!solved && (
        <form onSubmit={handleSubmit} className="evidence-quiz-form">
          {questions.map((q) => (
            <div className="evidence-quiz-question" key={q.id}>
              <label htmlFor={q.id}>{q.label}</label>
              <input
                id={q.id}
                type={getInputType(q.kind)}
                inputMode={
                  getInputType(q.kind) === "number" ? "numeric" : undefined
                }
                step={getInputType(q.kind) === "number" ? 1 : undefined}
                value={answers[q.id] ?? ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                autoComplete="off"
              />
            </div>
          ))}

          {error && <p className="evidence-quiz-error">{error}</p>}

          <button type="submit" className="evidence-quiz-submit">
            Submit answers
          </button>
        </form>
      )}
    </section>
  );
};

export default EvidenceQuiz;
