import OptionInput from "./OptionInput";

export default function QuestionCard({
  question,
  index,
  onUpdateText,
  onUpdateOption,
  onAddOption,
  onSetCorrect,
  onRemoveQuestion
}) {
  return (
    <div style={{ background: "#fff", padding: 16, marginBottom: 16, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Question {index + 1}</strong>
        <button onClick={() => onRemoveQuestion(question.id)}>Remove</button>
      </div>

      <input
        placeholder="Question text"
        value={question.text}
        onChange={(e) => onUpdateText(question.id, e.target.value)}
        style={{ width: "100%", padding: 8, margin: "12px 0" }}
      />

      {question.options.map((opt, i) => (
        <OptionInput
          key={i}
          optionText={opt}
          isCorrect={question.correctAnswer === i}
          onChangeText={(text) => onUpdateOption(question.id, i, text)}
          onSelectCorrect={() => onSetCorrect(question.id, i)}
        />
      ))}

      <button onClick={() => onAddOption(question.id)}>+ Add Option</button>
    </div>
  );
}
