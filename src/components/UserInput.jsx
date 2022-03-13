import { useState } from "react";

/**
 * User input component for the user to type the commands
 * @component
 * return (
 *   <UserInput.../>
 * )
 */
function UserInput(props) {
  const { onEnterCommand } = props;
  const [userText, setUserText] = useState("");

  /**
   * Function that handles onchange of input
   * @param {event} e - event of the input
   */
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      onEnterCommand(e);
      setUserText("");
    }
  };

  return (
    <input
      alt="Command Input"
      type="text"
      value={userText}
      onChange={(e) => setUserText(e.target.value.toUpperCase())}
      onKeyPress={(e) => handleEnter(e)}
    />
  );
}
export default UserInput;
