/**
 * User input component for the user to type the commands
 * @component
 * return (
 *   <UserInput.../>
 * )
 */
function UserInput(props) {
  const { userTextValue, onChangeInput, onEnterCommand } = props;

  return (
    <input
      type="text"
      value={userTextValue}
      onChange={(e) => onChangeInput(e.target.value.toUpperCase())}
      onKeyPress={(e) => onEnterCommand(e)}
    />
  );
}
export default UserInput;
