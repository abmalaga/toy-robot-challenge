import * as constant from "../../constants/constant";

import { evaluateCommand, inBetween, checkValidCoordinates } from "../helper";

describe("Checking if a number is greater or equal to 0 and less than upper limit", () => {
  test("Number is greater than equal to 0 and less than upper limit(x)", () => {
    expect(inBetween(0, constant.DIMENSION.x)).toBe(true);
  });
  test("Number is greater than equal to 0 and less than upper limit(y)", () => {
    expect(inBetween(4, constant.DIMENSION.y)).toBe(true);
  });
  test("Number is greater than equal to 0 and equal the upper limit(y)", () => {
    expect(inBetween(5, constant.DIMENSION.y)).toBe(false);
  });
  test("Number is NOT greater than equal to 0 and less than upper limit", () => {
    expect(inBetween(-5, constant.DIMENSION.x)).toBe(false);
  });
});

describe("Checking if a coordinate is valid", () => {
  test("Valid coordinate: 0,4", () => {
    expect(checkValidCoordinates({ x: "0", y: "4" })).toBe(true);
  });
  test("Valid coordinate: 3,4", () => {
    expect(checkValidCoordinates({ x: "3", y: "4" })).toBe(true);
  });
  test("Invalid coordinate: -1,3", () => {
    expect(checkValidCoordinates({ x: "-1", y: "3" })).toBe(false);
  });
  test("Invalid coordinate: 6,1", () => {
    expect(checkValidCoordinates({ x: "6", y: "1" })).toBe(false);
  });
  test("Invalid coordinate: null, null", () => {
    expect(checkValidCoordinates({ x: null, y: null })).toBe(false);
  });
});

describe("Evaluate commands", () => {
  describe("Place commands", () => {
    test("PLACE 0,0,NORTH", () => {
      expect(
        evaluateCommand("PLACE 0,0,NORTH", {
          x: null,
          y: null,
          f: null,
          placed: false,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "0",
        f: constant.DIRECTION_VALUE.NORTH,
        message: "PLACE 0,0,NORTH",
        commandString: constant.COMMAND_STRINGS.PLACE,
      });
    });
    test("PLACE 4,3,WEST, placed on the board", () => {
      expect(
        evaluateCommand("PLACE 4,3,WEST", {
          x: "0",
          y: "0",
          f: constant.DIRECTION_VALUE.SOUTH,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "4",
        y: "3",
        f: constant.DIRECTION_VALUE.WEST,
        message: "PLACE 4,3,WEST",
        commandString: constant.COMMAND_STRINGS.PLACE,
      });
    });
    test("PLACE 5,6,EAST which is outside the board", () => {
      expect(
        evaluateCommand("PLACE 5,6,EAST", {
          x: "5",
          y: "6",
          f: constant.DIRECTION_VALUE.EAST,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: false,
        x: "5",
        y: "6",
        f: constant.DIRECTION_VALUE.EAST,
        message: constant.ERROR_MESSAGES.INVALID_COORDS,
        commandString: constant.COMMAND_STRINGS.PLACE,
      });
    });
  });

  describe("Left commands", () => {
    test("Left NOT in Table", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.LEFT, {
          x: null,
          y: null,
          f: null,
          placed: false,
        })
      ).toEqual({
        shouldDoCommand: false,
        message: constant.ERROR_MESSAGES.NOT_PLACED,
      });
    });
    test("Left from South", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.LEFT, {
          x: "4",
          y: "3",
          f: constant.DIRECTION_VALUE.SOUTH,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "4",
        y: "3",
        f: constant.DIRECTION_VALUE.EAST,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });
    test("Left from East", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.LEFT, {
          x: "3",
          y: "2",
          f: constant.DIRECTION_VALUE.EAST,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "3",
        y: "2",
        f: constant.DIRECTION_VALUE.NORTH,
        message: constant.COMMAND_STRINGS.LEFT,
        commandString: constant.COMMAND_STRINGS.LEFT,
      });
    });
  });

  describe("Right commands", () => {
    test("Right NOT in Table", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.RIGHT, {
          x: null,
          y: null,
          f: null,
          placed: false,
        })
      ).toEqual({
        shouldDoCommand: false,
        message: constant.ERROR_MESSAGES.NOT_PLACED,
      });
    });
    test("Right from South", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.RIGHT, {
          x: "4",
          y: "3",
          f: constant.DIRECTION_VALUE.SOUTH,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "4",
        y: "3",
        f: constant.DIRECTION_VALUE.WEST,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });
    test("Right from East", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.RIGHT, {
          x: "3",
          y: "2",
          f: constant.DIRECTION_VALUE.EAST,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "3",
        y: "2",
        f: constant.DIRECTION_VALUE.SOUTH,
        message: constant.COMMAND_STRINGS.RIGHT,
        commandString: constant.COMMAND_STRINGS.RIGHT,
      });
    });
  });

  describe("Move Commands", () => {
    test("Move command 0,0,NORTH", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.MOVE, {
          x: "0",
          y: "0",
          f: constant.DIRECTION_VALUE.NORTH,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        x: "0",
        y: "1",
        placed: true,
        f: constant.DIRECTION_VALUE.NORTH,
        message: constant.COMMAND_STRINGS.MOVE,
        commandString: constant.COMMAND_STRINGS.MOVE,
      });
    });
    test("Move command 4,4,EAST", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.MOVE, {
          x: "4",
          y: "4",
          f: constant.DIRECTION_VALUE.EAST,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: false,
        x: "4",
        y: "4",
        f: constant.DIRECTION_VALUE.EAST,
        placed: true,
        message: constant.ERROR_MESSAGES.INVALID_MOVE,
        commandString: constant.COMMAND_STRINGS.MOVE,
      });
    });
    test("Move Robot not in Table", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.MOVE, {
          x: null,
          y: null,
          f: null,
          placed: false,
        })
      ).toEqual({
        shouldDoCommand: false,
        message: constant.ERROR_MESSAGES.NOT_PLACED,
      });
    });
  });

  describe("Report Commands", () => {
    test("Report Robot not in table", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.REPORT, {
          x: null,
          y: null,
          f: null,
          place: false,
        })
      ).toEqual({
        shouldDoCommand: false,
        message: constant.ERROR_MESSAGES.NOT_PLACED,
      });
    });
    test("Report Robot in 4,2,EAST", () => {
      expect(
        evaluateCommand(constant.COMMAND_STRINGS.REPORT, {
          x: "4",
          y: "2",
          f: constant.DIRECTION_VALUE.EAST,
          placed: true,
        })
      ).toEqual({
        shouldDoCommand: true,
        message: "4,2,EAST",
        commandString: constant.COMMAND_STRINGS.REPORT,
      });
    });
  });
});
