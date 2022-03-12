import { useState } from "react";

import RobotInfo from "./components/RobotInfo";
import Console from "./components/Console";
import UserInput from "./components/UserInput";

import { COMMAND_STRINGS } from "./constants/constant";
import { evaluateCommand } from "./utils/helper";

import "./App.css";

/**
 * Component to render the toy robot challenge
 * @component
 */
function App() {
  const [userText, setUserText] = useState("");
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
   * Function that happens onchange of input
   * @param {event} e - event of the input
   */
  const onDoCommand = (e) => {
    if (e.key === "Enter") {
      //check first if command is valid
      const textCommand = e.target.value.trim();
      const { shouldDoCommand, commandString, x, y, f, message } =
        evaluateCommand(textCommand, robotCoords);
      if (shouldDoCommand && commandString !== COMMAND_STRINGS.REPORT) {
        moveRobot({ x, y, f });
      }
      setCommandText([message, ...commandText]);
      setUserText("");
    }
  };

  return (
    <div className="App-body">
      <RobotInfo robotCoordinates={robotCoords} />
      <UserInput
        userTextValue={userText}
        onChangeInput={setUserText}
        onEnterCommand={onDoCommand}
      />
      <Console commandText={commandText} />
    </div>
  );
}

export default App;
