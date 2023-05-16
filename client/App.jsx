import React from "react";

const App = () => {
    const test = () => {
        fetch("/test");
    }
  return (
    <>
      <h1>coinSpy</h1>
      <button onClick={test}>test backend</button>
    </>
  );
};

export default App;
