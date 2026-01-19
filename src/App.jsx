import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard";

export default function App() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [solveMode, setSolveMode] = useState(false);
  const [answers, setAnswers] = useState({});

  // Load saved quiz from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quiz-builder-data");
    if (saved) {
      const data = JSON.parse(saved);
      setQuizTitle(data.quizTitle);
      setQuestions(data.questions);
    } else {
      // default one question
      addQuestion();
    }
  }, []);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), text: "", options: ["", ""], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestionText = (id, text) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const updateOptionText = (qId, idx, text) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: q.options.map((o, i) => (i === idx ? text : o)) } : q
      )
    );
  };

  const addOption = (qId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const setCorrectAnswer = (qId, idx) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, correctAnswer: idx } : q))
    );
  };

  const saveQuiz = () => {
    localStorage.setItem(
      "quiz-builder-data",
      JSON.stringify({ quizTitle, questions })
    );
    alert("Quiz saved!");
  };

  const resetQuiz = () => {
  if (window.confirm("Are you sure you want to reset the quiz? All data will be lost!")) {
    localStorage.removeItem("quiz-builder-data");
    setQuizTitle("");
    setQuestions([{ id: Date.now(), text: "", options: ["", ""], correctAnswer: 0 }]);
    setAnswers({});
  }
};


  // Solve mode logic
  const handleAnswerChange = (qId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  if (solveMode) {
    return (
      <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
        <h1>{quizTitle}</h1>
        {questions.map((q, i) => (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <p><strong>Q{i + 1}:</strong> {q.text}</p>
            {q.options.map((opt, idx) => (
              <label key={idx} style={{ display: "block", marginBottom: 4 }}>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === idx}
                  onChange={() => handleAnswerChange(q.id, idx)}
                /> {opt}
              </label>
            ))}
          </div>
        ))}
        <button onClick={() => alert(`Score: ${calculateScore()} / ${questions.length}`)}>Submit Quiz</button>
        <button onClick={() => setSolveMode(false)} style={{ marginLeft: 12 }}>Back to Builder</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h1>Quiz Builder</h1>
        <button onClick={saveQuiz}>Save Quiz</button>
        <button onClick={() => setSolveMode(true)} style={{ marginLeft: 12 }}>Solve Quiz</button>
      </div>

      <input
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="Enter Quiz Title"
        style={{ width: "100%", padding: 10, marginBottom: 24 }}
      />

      {questions.map((q, idx) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={idx}
          onUpdateText={updateQuestionText}
          onUpdateOption={updateOptionText}
          onAddOption={addOption}
          onSetCorrect={setCorrectAnswer}
          onRemoveQuestion={removeQuestion}
        />
      ))}
    <button onClick={resetQuiz} style={{ marginLeft: 12, background: "#f87171", color: "#fff", padding: "6px 12px" }}>
  Reset Quiz
</button>

      <button onClick={addQuestion} style={{ width: "100%", padding: 12, marginTop: 12 }}>
        + Add New Question
      </button>
    </div>
  );
}
