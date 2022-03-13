import * as constant from "../constants/constant";

import { checkValidCoordinates, inBetween } from "./helper";

/**
 * Returns an object containing information about the move command
 * @param {object} currRobotCoords - Information regarding the x,y, and facing of robot
 * @returns {object} Information about the given move command
 */
export function moveRobot(currRobotCoords) {
  const newRobotCoords = { ...currRobotCoords };
  let isValidMove = false;
  let movedCoords;
  if (checkValidCoordinates(currRobotCoords)) {
    switch (currRobotCoords.f) {
      case constant.DIRECTION_VALUE.NORTH:
        movedCoords = parseInt(newRobotCoords.y) + 1;
        if (inBetween(movedCoords, constant.DIMENSION.y)) {
          newRobotCoords.y = movedCoords.toString();
          isValidMove = true;
        }
        break;
      case constant.DIRECTION_VALUE.SOUTH:
        movedCoords = parseInt(newRobotCoords.y) - 1;
        if (inBetween(movedCoords, constant.DIMENSION.y)) {
          newRobotCoords.y = movedCoords.toString();
          isValidMove = true;
        }
        break;
      case constant.DIRECTION_VALUE.EAST:
        movedCoords = parseInt(newRobotCoords.x) + 1;
        if (inBetween(movedCoords, constant.DIMENSION.x)) {
          newRobotCoords.x = movedCoords.toString();
          isValidMove = true;
        }
        break;
      case constant.DIRECTION_VALUE.WEST:
        movedCoords = parseInt(newRobotCoords.x) - 1;
        if (inBetween(movedCoords, constant.DIMENSION.x)) {
          newRobotCoords.x = movedCoords.toString();
          isValidMove = true;
        }
        break;
      default:
        break;
    }
  }
  return {
    shouldDoCommand: isValidMove,
    commandString: constant.COMMAND_STRINGS.MOVE,
    ...newRobotCoords,
    message: isValidMove
      ? constant.COMMAND_STRINGS.MOVE
      : constant.ERROR_MESSAGES.INVALID_MOVE,
  };
}

/**
 * Returns an object containing information about the turn command
 * @param {string} x- The x coordinate current of the robot
 * @param {string} y- The y coordinate current of the robot
 * @param {string} f- The current facing direction of the robot
 * @param {number} degreeDesiredFacing- The angle to be added/minus to the current angle
 * @param {string} command- The string command done
 * @returns {object} Information about the given move command
 */
export function turnRobot({ x, y, f }, degreeDesiredFacing, command) {
  let newFacing = "";
  const degreeCurrentFacing = constant.DIRECTION_DEGREE[f];
  switch (degreeCurrentFacing + degreeDesiredFacing) {
    case 360:
    case 0:
      newFacing = constant.DIRECTION_VALUE.NORTH;
      break;
    case 270:
    case -90:
      newFacing = constant.DIRECTION_VALUE.WEST;
      break;
    case 180:
      newFacing = constant.DIRECTION_VALUE.SOUTH;
      break;
    case 90:
      newFacing = constant.DIRECTION_VALUE.EAST;
      break;
    default:
      break;
  }
  return {
    shouldDoCommand: true,
    x,
    y,
    f: newFacing,
    message: command,
    commandString: command,
  };
}
