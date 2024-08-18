import "../index.css";
function DarkToggleButton({ children, onMode }) {
  // const buttonStyle = {
  //   alignItems: "center",
  //   appearance: "none",
  //   backgroundColor: "#FCFCFD",
  //   borderRadius: "4px",
  //   borderWidth: "0",
  //   boxShadow:
  //     "rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
  //   boxSizing: "border-box",
  //   color: "#36395A",
  //   cursor: "pointer",
  //   display: "inline-flex",
  //   fontFamily: '"JetBrains Mono", monospace',
  //   height: "48px",
  //   justifyContent: "center",
  //   lineHeight: "1",
  //   listStyle: "none",
  //   overflow: "hidden",
  //   paddingLeft: "16px",
  //   paddingRight: "16px",
  //   position: "relative",
  //   textAlign: "left",
  //   textDecoration: "none",
  //   transition: "box-shadow .15s, transform .15s",
  //   userSelect: "none",
  //   WebkitUserSelect: "none",
  //   touchAction: "manipulation",
  //   whiteSpace: "nowrap",
  //   willChange: "box-shadow, transform",
  //   fontSize: "18px",
  // };

  const focusStyle = {
    boxShadow:
      "#D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
  };

  const hoverStyle = {
    boxShadow:
      "rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset",
    transform: "translateY(-2px)",
  };

  const activeStyle = {
    boxShadow: "#D6D6E7 0 3px 7px inset",
    transform: "translateY(2px)",
  };

  return (
    <button onClick={onMode} className="btn btn-ui" style={{ color: "white" }}>
      {children}
    </button>
  );
}

export default DarkToggleButton;
