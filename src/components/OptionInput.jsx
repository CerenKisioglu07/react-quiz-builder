export default function OptionInput({ optionText, isCorrect, onChangeText, onSelectCorrect }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
      <input type="radio" checked={isCorrect} onChange={onSelectCorrect} />
      <input
        value={optionText}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder="Option text"
        style={{ flex: 1, padding: 6 }}
      />
    </div>
  );
}
