function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastary </h3>
      <button
        onClick={() => {
          dispatch({ type: "start" });
        }}
        className="btn btn-ui"
      >
        let's start
      </button>
    </div>
  );
}
export default StartScreen;
