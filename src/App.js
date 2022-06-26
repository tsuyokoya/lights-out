import React from "react";
import Board from "./Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Lights Out</h1>
      <Board rows={5} cols={5} cellLitProbability={0.5} />
    </div>
  );
}

export default App;
