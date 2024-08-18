import { queries } from "@testing-library/react";

function Options({ curQuestion, dispatch, answer, isDark }) {
  const hasAnswered = answer !== null;
  const answers = curQuestion.options.map((option, index) => {
    return (
      <button
        className={`btn btn-option ${index === answer ? "answer" : ""} ${
          hasAnswered
            ? index === curQuestion.correctOption
              ? "correct"
              : "wrong"
            : ""
        }`}
        style={{ color: isDark ? "white" : "white" }}
        key={option}
        disabled={hasAnswered}
        onClick={() => {
          dispatch({ type: "newAnswer", payload: index });
        }}
      >
        {option}
      </button>
    );
  });
  return (
    <div>
      <div className="options">{answers}</div>
    </div>
  );
}

export default Options;
