import * as constant from "../constants/constant";

import { moveRobot, turnRobot } from "./robot";

/**
 * Returns true if the command is existing in our constants
 * @param {string} command - The command to evaluate
 * @returns {boolean} Command given is valid
 */
function checkValidCommand(command) {
  const isValidCommand = constant.VALID_COMMANDS.some((validCommand) =>
    command.match(validCommand)
  );
  return isValidCommand;
}

/**
 * Returns true if the x and y given is a valid coordinate
 * @param {string} x- The x coordinate to check if valid
 * @param {string} y- The y coordinate to check if valid
 * @returns {boolean} X and Y are both valid coordinates
 */
export function checkValidCoordinates({ x, y }) {
  return (
    inBetween(x, constant.DIMENSION.x) && inBetween(y, constant.DIMENSION.y)
  );
}

/**
 * Returns true if a given value is in between 0 and a certain limit
 * @param {string} value - The given value to evaluate if in between 0 and a number
 * @param {number} upperLimit - The given upper limit to evaluate the value
 * @returns {boolean} Value is in between 0 and less than the upper limit
 */
export function inBetween(value, upperLimit) {
  const valueNum = parseInt(value);
  return valueNum >= 0 && valueNum < upperLimit;
}

/**
 * Returns an object containing information about the command
 * @param {string} command - The command inputted by the user
 * @param {object} currRobotCoords - The current x, y, and the facing of the robot
 * @returns {object} Information about the given command
 */
export function evaluateCommand(command, currRobotCoords) {
  const parsedCommand = checkCommand(command, currRobotCoords);
  if (parsedCommand.valid) {
    const commandString = getCommand(command);
    switch (commandString) {
      case constant.COMMAND_STRINGS.PLACE:
        const placedCoordinates = getCoordinates(command);
        const shouldDoCommand = checkValidCoordinates(placedCoordinates);
        return {
          shouldDoCommand,
          commandString,
          ...placedCoordinates,
          message: shouldDoCommand
            ? command
            : constant.ERROR_MESSAGES.INVALID_COORDS,
        };
      case constant.COMMAND_STRINGS.MOVE:
        return moveRobot(currRobotCoords);
      case constant.COMMAND_STRINGS.LEFT:
        return turnRobot(
          currRobotCoords,
          constant.COMMAND_DEGREE[constant.COMMAND_STRINGS.LEFT],
          constant.COMMAND_STRINGS.LEFT
        );
      case constant.COMMAND_STRINGS.RIGHT:
        return turnRobot(
          currRobotCoords,
          constant.COMMAND_DEGREE[constant.COMMAND_STRINGS.RIGHT],
          constant.COMMAND_STRINGS.RIGHT
        );
      case constant.COMMAND_STRINGS.REPORT:
        return {
          shouldDoCommand: true,
          commandString,
          message: `${currRobotCoords.x},${currRobotCoords.y},${currRobotCoords.f}`,
        };
      default:
        break;
    }
  } else {
    return { shouldDoCommand: false, message: parsedCommand.message };
  }
}

/**
 * Returns an object containing information whether to go through evaluating the command
 * @param {string} command - The command inputted by the user
 * @param {object} currRobotCoords - The current x, y, and the facing of the robot
 * @returns {object} Information about the given command and message
 */
function checkCommand(command, currRobotCoords) {
  if (checkValidCommand(command)) {
    const commandString = getCommand(command);
    if (
      commandString !== constant.COMMAND_STRINGS.PLACE &&
      !currRobotCoords.placed
    ) {
      return {
        valid: false,
        message: constant.ERROR_MESSAGES.NOT_PLACED,
      };
    } else {
      return {
        valid: true,
        message: "",
      };
    }
  } else {
    return {
      valid: false,
      message: constant.ERROR_MESSAGES.INVALID_COMMAND,
    };
  }
}

/**
 * Returns the command (PLACE, MOVE, LEFT, RIGHT, REPORt) given by the user
 * @param {string} command - The command inputted by the user
 * @returns {string} The main command given by the user
 */
function getCommand(command) {
  return command.split(" ")?.[0] || "";
}

/**
 * Returns the command (PLACE, MOVE, LEFT, RIGHT, REPORt) given by the user
 * @param {string} command - The command inputted by the user
 * @returns {object} The object containing derived x,y, and facing information
 */
function getCoordinates(command) {
  const commandCoords = command.split(" ")[1];
  let [x, y, f] = commandCoords.split(",");
  return { x, y, f };
}
