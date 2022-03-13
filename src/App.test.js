import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(() => {
  cleanup();
});

const setupAppComponent = () => {
  render(<App />);
  const inputElement = screen.getByAltText("Command Input");
  const consoleInfo = screen.getByText(/Entered commands will show here/i);
  return { inputElement, consoleInfo };
};

describe("Initial state of the App upon on load", () => {
  test("Initial input text", () => {
    const { inputElement } = setupAppComponent();
    expect(inputElement).toBeInTheDocument();
  });
  test("Initial entered commands", () => {
    const { consoleInfo } = setupAppComponent();
    expect(consoleInfo).toBeInTheDocument();
  });
});

describe("User inputs a command", () => {
  test("User is able to input a command and transformed into uppercase", () => {
    const { inputElement } = setupAppComponent();
    fireEvent.change(inputElement, { target: { value: "hello" } });
    expect(inputElement.value).toBe("HELLO");
  });

  test("User inputs an invalid command and evaluated", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    fireEvent.change(inputElement, { target: { value: "sample command" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent("Please enter a valid command");
    expect(inputElement.value).toBe("");
  });

  test("User inputs PLACE 0,4,NORTH", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    fireEvent.change(inputElement, { target: { value: "place 0,4,north" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent("PLACE 0,4,NORTH");
    expect(inputElement.value).toBe("");
  });

  test("User MOVES or Left or RIGHT or report without the toy on the table", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    //User inputs MOVE
    fireEvent.change(inputElement, { target: { value: "move" } });
    expect(inputElement.value).toBe("MOVE");
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent(
      "Robot is not placed in the table yet"
    );
    expect(inputElement.value).toBe("");
    //User inputs LEFT
    fireEvent.change(inputElement, { target: { value: "left" } });
    expect(inputElement.value).toBe("LEFT");
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent(
      "Robot is not placed in the table yet"
    );
    expect(inputElement.value).toBe("");
    //User inputs RIGHT
    fireEvent.change(inputElement, { target: { value: "right" } });
    expect(inputElement.value).toBe("RIGHT");
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent(
      "Robot is not placed in the table yet"
    );
    expect(inputElement.value).toBe("");
    //User inputs report
    fireEvent.change(inputElement, { target: { value: "report" } });
    expect(inputElement.value).toBe("REPORT");
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent(
      "Robot is not placed in the table yet"
    );
    expect(inputElement.value).toBe("");
  });
});

describe("End to end tests", () => {
  test("Example input consecutive commands A", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    //PLACE 0,0,NORTH
    fireEvent.change(inputElement, { target: { value: "place 0,0,north" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //MOVE
    fireEvent.change(inputElement, { target: { value: "move" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //REPORT
    fireEvent.change(inputElement, { target: { value: "report" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent("0,1,NORTH");
    expect(inputElement.value).toBe("");
  });

  test("Example input consecutive commands B", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    //PLACE 0,0,NORTH
    fireEvent.change(inputElement, { target: { value: "place 0,0,north" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //LEFT
    fireEvent.change(inputElement, { target: { value: "left" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //REPORT
    fireEvent.change(inputElement, { target: { value: "report" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent("0,0,WEST");
    expect(inputElement.value).toBe("");
  });

  test("Example input consecutive commands C", () => {
    const { inputElement, consoleInfo } = setupAppComponent();
    //PLACE 1,2,EAST
    fireEvent.change(inputElement, { target: { value: "place 1,2,east" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //MOVE
    fireEvent.change(inputElement, { target: { value: "move" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //MOVE
    fireEvent.change(inputElement, { target: { value: "move" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //LEFT
    fireEvent.change(inputElement, { target: { value: "left" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //MOVE
    fireEvent.change(inputElement, { target: { value: "move" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    //REPORT
    fireEvent.change(inputElement, { target: { value: "report" } });
    fireEvent.keyPress(inputElement, { key: "Enter", code: 13, charCode: 13 });
    expect(consoleInfo).toHaveTextContent("3,3,NORTH");
    expect(inputElement.value).toBe("");
  });
});
