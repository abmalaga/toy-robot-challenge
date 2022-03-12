/**
 * Component so the user will see the current robot information
 * @component
 * return (
 *   <RobotInfo.../>
 * )
 */
function RobotInfo(props) {
  const { x, y, f, placed } = props.robotCoordinates;
  return (
    <>
      <h2>Toy Robot Challenge</h2>
      <p>
        Robot is currently{" "}
        {placed ? (
          <code>{`in ${x},${y},facing ${f}`}</code>
        ) : (
          <code>not in the table</code>
        )}
      </p>
    </>
  );
}
export default RobotInfo;
