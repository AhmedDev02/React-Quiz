import { useEffect } from "react";

function Timer({ seconds, dispatch, isDark }) {
  const minutes = Math.floor(seconds / 60);
  const secondsReminder = seconds % 60;
  useEffect(
    function () {
      const decreaser = setInterval(function () {
        dispatch({ type: "clock", payload: 1 });
      }, 1000);
      return () => clearInterval(decreaser);
    },
    [seconds, dispatch]
  );
  return (
    <p key={isDark} className="timer ">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {secondsReminder < 10 ? `0${secondsReminder}` : secondsReminder}
    </p>
  );
}

export default Timer;
