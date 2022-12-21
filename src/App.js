import "./App.css";
import Dice from "./Dice";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, SetDice] = useState(allNewDice());
  const [diceValues, setDiceValues] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setDiceValues(true);
      console.log("You won!");
    }
  }, [dice]);

  function allNewDice() {
    const DieNum = [];
    for (let i = 1; i <= 10; i++) {
      DieNum.push(generateNewDie());
    }
    return DieNum;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    };
  }

  function rollDice() {
    if (!diceValues) {
      SetDice((oldDice) =>
        oldDice.map((num) => {
          return num.isHeld ? num : generateNewDie();
        })
      );
    } else {
      setDiceValues(false);
      SetDice(allNewDice());
    }
  }

  function holdDice(id) {
    SetDice((oldDice) =>
      oldDice.map((num) => {
        return num.id === id ? { ...num, isHeld: !num.isHeld } : num;
      })
    );
  }

  const diceElements = dice.map((num) => (
    <Dice
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      holdDice={() => {
        holdDice(num.id);
      }}
    />
  ));

  return (
    <div className="App">
      <div className="App__container">
      {diceValues}
      <h1 className="App__title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.</p>
      <div className="App__die--grid">{diceElements}</div>
      <button type="button" className="App__rollBtn" onClick={rollDice}>
        {diceValues === true ? "You Won" : "Roll"}
      </button>
    </div>

    </div>
    
  );
}

export default App;
