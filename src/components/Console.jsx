/**
 * Console component so the user can see the commands entered
 * @component
 * return (
 *   <Console.../>
 * )
 */
function Console(props) {
  const commandText = props.commandText;
  return (
    <div className="console-div">
      {commandText.map((text, idx) => {
        return <p key={idx}>{text}</p>;
      })}
    </div>
  );
}
export default Console;
