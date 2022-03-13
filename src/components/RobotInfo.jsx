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
        {placed ? `in ${x},${y},facing ${f}` : `not on the table`}
      </p>
    </>
  );
}
export default RobotInfo;
