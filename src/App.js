import { useState } from "react";

import Console from "./components/Console";
import UserInput from "./components/UserInput";
import Table from "./components/Table";

import { COMMAND_STRINGS } from "./constants/constant";
import { evaluateCommand } from "./utils/helper";

import "./App.css";

/**
 * Component to render the toy robot challenge
 * @component
 */
function App() {
  const [commandText, setCommandText] = useState([
    "Entered commands will show here",
  ]);
  const [robotCoords, setRobotCoords] = useState({
    x: null,
    y: null,
    f: null,
    placed: false,
  });

  /**
   * Sets new robot coordinates
   * @param {string} x,y,f, - Information regarding the x,y, and facing of robot
   */
  const moveRobot = ({ x, y, f }) => {
    setRobotCoords({ ...robotCoords, x, y, f, placed: true });
  };

  /**
   * Function that happens on enter of the user
   * @param {event} e - event of the input
   */
  const onDoCommand = (e) => {
    const textCommand = e.target.value.trim();
    const { shouldDoCommand, commandString, x, y, f, message } =
      evaluateCommand(textCommand, robotCoords);
    if (shouldDoCommand && commandString !== COMMAND_STRINGS.REPORT) {
      moveRobot({ x, y, f });
    }
    setCommandText([message, ...commandText]);
  };

  return (
    <div className="App-body">
      <Table robotCoords={robotCoords} />
      <h2>Toy Robot Challenge</h2>
      <UserInput onEnterCommand={onDoCommand} />
      <Console commandText={commandText} />
    </div>
  );
}

export default App;
