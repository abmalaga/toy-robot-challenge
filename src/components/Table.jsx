import { DIMENSION } from "../constants/constant";
/**
 * Table component to show the robot graphically
 * @component
 * return (
 *   <Table.../>
 * )
 */
function Table(props) {
  const { x, y, f, placed } = props.robotCoords;

  /**
   * Function that checks if the cell is active
   * @param {event} e - event of the input
   */
  const isCellActive = (row, col) => {
    return placed && parseInt(x) === row && parseInt(y) === col
      ? `active ${f.toLowerCase()}`
      : "";
  };

  /**
   * Function that returns the div cells
   * @param {event} e - event of the input
   */
  const getDivCells = () => {
    let divCells = [];
    for (let row = DIMENSION.y - 1; row >= 0; row--) {
      for (let col = 0; col < DIMENSION.x; col++) {
        divCells.push(
          <div
            key={`${col},${row}`}
            id={`${col},${row}`}
            className={`grid-item ${isCellActive(col, row)}`}
          />
        );
      }
    }
    return divCells;
  };

  return <div className="grid-container">{getDivCells()}</div>;
}

export default Table;
