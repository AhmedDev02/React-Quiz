import Options from "./Options.js";
function Question({ curQuestion, dispatch, answer, isDark }) {
  return (
    <div>
      <h4>{curQuestion.question}</h4>
      <Options
        isDark={isDark}
        curQuestion={curQuestion}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
