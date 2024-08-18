import { useEffect, useReducer, useState, useRef } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
import DarkToggleButton from "./DarkToggleButton.js";
import { useLocalStorageState } from "./useLocalStorageState.js";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],

  //'loading', 'error','ready','active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);

      const getPoint = state.points + currentQuestion.points;
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? getPoint
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index:
          state.index < state.questions.length ? state.index++ : state.index,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "clock":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - action.payload,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [isDark, setIsDark] = useLocalStorageState(false, "nightMode");
  const bodyRef = useRef(null);
  const buttonsRef = useRef(null);
  const timerRef = useRef(null);
  const buttunUIRef = useRef(null);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  function handleIsDark() {
    setIsDark(!isDark);
  }

  useEffect(() => {
    console.log(isDark);
    document.body.style.backgroundColor = isDark
      ? "var(--color-darkest)"
      : "white";
    document.body.style.color = isDark ? "var(--color-light)" : "black";
    const timer = document.querySelector(".timer");
    if (timer) {
      timer.style.color = isDark ? "var(--color-light)" : "black";
    }
    const buttons = document.querySelectorAll(".btn, .btn-ui");
    buttons.forEach((button) => {
      button.style.color = isDark ? "var(--color-light)" : "black";
    });
  }, [isDark]);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <DarkToggleButton onMode={() => handleIsDark()}>Mode</DarkToggleButton>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              totalPoints={totalPoints}
              answer={answer}
              points={points}
              isDark={isDark}
            />
            <Question
              curQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
              isDark={isDark}
            />
            <Footer>
              <>
                <Timer dispatch={dispatch} seconds={secondsRemaining} />
                <NextButton
                  index={index}
                  numQuestions={numQuestions}
                  dispatch={dispatch}
                  answer={answer}
                  isDark={isDark}
                />
              </>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
