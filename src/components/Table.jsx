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
   * @param {event} col - column number of the current cell to evaluate
   * @param {event} row - row number of the current cell to evaluate
   * @returns {string} Classname to be added to the active cell
   */
  const isCellActive = (col, row) => {
    return placed && parseInt(x) === col && parseInt(y) === row
      ? `active ${f.toLowerCase()}`
      : "";
  };

  /**
   * Function that returns the div cells
   * @returns {object} Array of the table cells
   */
  const getDivCells = () => {
    let divCells = [];
    for (let row = DIMENSION.y - 1; row >= 0; row--) {
      for (let col = 0; col < DIMENSION.x; col++) {
        divCells.push(
          <div
            key={`${col},${row}`}
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
