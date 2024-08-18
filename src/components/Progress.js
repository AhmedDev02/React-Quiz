function Progress({
  index,
  numQuestions,
  totalPoints,
  answer,
  points,
  isDark,
}) {
  return (
    <header
      className="progress"
      style={{
        color: isDark ? "var(--color-light)" : "var(--color-darkest)",
      }}
    >
      <progress
        type="progress"
        value={index + Number(answer !== null)}
        readOnly
        max={numQuestions}
      />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
