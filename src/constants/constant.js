/** @constant The current dimension of the table
    @type {object}
*/
export const DIMENSION = {
  x: 5,
  y: 5,
};

/** @constant Regex compilations of the valid commands
    @type {array}
*/
export const VALID_COMMANDS = [
  new RegExp("^PLACE [0-9]+,+[0-9]+,(NORTH|SOUTH|EAST|WEST)$", "g"),
  new RegExp("^MOVE$", "g"),
  new RegExp("^LEFT$", "g"),
  new RegExp("^RIGHT$", "g"),
  new RegExp("^REPORT$", "g"),
];

/** @constant Object compilation of the command strings
    @type {object}
*/
export const COMMAND_STRINGS = {
  PLACE: "PLACE",
  MOVE: "MOVE",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  REPORT: "REPORT",
};

/** @constant Object compilation of the direction values
    @type {object}
*/
export const DIRECTION_VALUE = {
  NORTH: "NORTH",
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST",
};

/** @constant Object compilation of appropriate degree for directions
    @type {object}
*/
export const DIRECTION_DEGREE = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
};

/** @constant Object compilation of the command to be subtracted or added
    @type {object}
*/
export const COMMAND_DEGREE = {
  LEFT: -90,
  RIGHT: 90,
};

/** @constant Object compilation of the possible error messages
    @type {object}
*/
export const ERROR_MESSAGES = {
  INVALID_COMMAND: "Please enter a valid command",
  NOT_PLACED: "Robot is not placed in the table yet",
  INVALID_MOVE: "Cannot go further as it will fall off the table",
  INVALID_COORDS: "Invalid coordinates given",
};
