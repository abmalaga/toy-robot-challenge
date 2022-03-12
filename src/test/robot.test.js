import { moveRobot, turnRobot } from "../utils/robot";
import * as constant from "../constants/constant";

describe("Moving the robot", () => {
  test("Moves the robot facing north", () => {
    expect(
      moveRobot({ x: "4", y: "0", f: constant.DIRECTION_VALUE.NORTH })
    ).toEqual({
      commandString: "MOVE",
      f: constant.DIRECTION_VALUE.NORTH,
      message: "MOVE",
      shouldDoCommand: true,
      x: "4",
      y: "1",
    });
  });

  test("Moves the robot facing east", () => {
    expect(
      moveRobot({ x: "3", y: "3", f: constant.DIRECTION_VALUE.EAST })
    ).toEqual({
      commandString: "MOVE",
      f: constant.DIRECTION_VALUE.EAST,
      message: "MOVE",
      shouldDoCommand: true,
      x: "4",
      y: "3",
    });
  });

  test("Moves the robot facing west", () => {
    expect(
      moveRobot({ x: "3", y: "3", f: constant.DIRECTION_VALUE.WEST })
    ).toEqual({
      commandString: "MOVE",
      f: constant.DIRECTION_VALUE.WEST,
      message: "MOVE",
      shouldDoCommand: true,
      x: "2",
      y: "3",
    });
  });

  test("Moves the robot facing south", () => {
    expect(
      moveRobot({ x: "4", y: "4", f: constant.DIRECTION_VALUE.SOUTH })
    ).toEqual({
      commandString: "MOVE",
      f: constant.DIRECTION_VALUE.SOUTH,
      message: "MOVE",
      shouldDoCommand: true,
      x: "4",
      y: "3",
    });
  });

  test("Moves the robot outside the table", () => {
    expect(
      moveRobot({ x: "4", y: "4", f: constant.DIRECTION_VALUE.NORTH })
    ).toEqual({
      commandString: "MOVE",
      f: constant.DIRECTION_VALUE.NORTH,
      message: constant.ERROR_MESSAGES.INVALID_MOVE,
      shouldDoCommand: false,
      x: "4",
      y: "4",
    });
  });
});

describe("Turning the robot", () => {
  describe("Turning the robot to LEFT", () => {
    test("Turns the robot LEFT initially facing NORTH", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.NORTH },
          constant.COMMAND_DEGREE.LEFT,
          constant.COMMAND_STRINGS.LEFT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.WEST,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });

    test("Turns the robot LEFT initially facing EAST", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.EAST },
          constant.COMMAND_DEGREE.LEFT,
          constant.COMMAND_STRINGS.LEFT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.NORTH,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });

    test("Turns the robot LEFT initially facing SOUTH", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.SOUTH },
          constant.COMMAND_DEGREE.LEFT,
          constant.COMMAND_STRINGS.LEFT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.EAST,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });

    test("Turns the robot LEFT initially facing WEST", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.WEST },
          constant.COMMAND_DEGREE.LEFT,
          constant.COMMAND_STRINGS.LEFT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.SOUTH,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });
  });

  describe("Turning the robot to RIGHT", () => {
    test("Turns the robot RIGHT initially facing NORTH", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.NORTH },
          constant.COMMAND_DEGREE.RIGHT,
          constant.COMMAND_STRINGS.RIGHT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.EAST,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });

    test("Turns the robot RIGHT initially facing EAST", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.EAST },
          constant.COMMAND_DEGREE.RIGHT,
          constant.COMMAND_STRINGS.RIGHT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.SOUTH,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });

    test("Turns the robot RIGHT initially facing SOUTH", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.SOUTH },
          constant.COMMAND_DEGREE.RIGHT,
          constant.COMMAND_STRINGS.RIGHT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.WEST,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });

    test("Turns the robot RIGHT initially facing WEST", () => {
      expect(
        turnRobot(
          { x: "0", y: "0", f: constant.DIRECTION_VALUE.WEST },
          constant.COMMAND_DEGREE.RIGHT,
          constant.COMMAND_STRINGS.RIGHT
        )
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.NORTH,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });
  });
});
