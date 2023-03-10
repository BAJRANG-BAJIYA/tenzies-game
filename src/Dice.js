import React from "react";

const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  };

  return (
    <div className="App__die" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  );
};

export default Dice;
