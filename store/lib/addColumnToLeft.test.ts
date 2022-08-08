import { expect } from "@jest/globals";
import { addColumnToLeft } from "./addColumnToLeft";

describe("addColumnToLeft", () => {
  const initialState = {
    value: {
      "A-1": {
        rawValue: "A1",
        calculatedValue: "A1",
        meta: {},
      },
      "B-1": {
        rawValue: "B1",
        calculatedValue: "B1",
        meta: {},
      },
      "B-2": {
        rawValue: "B2",
        calculatedValue: "B2",
        meta: {},
      },
      "C-2": {
        rawValue: "C2",
        calculatedValue: "C2",
        meta: {},
      },
      "C-3": {
        rawValue: "C3",
        calculatedValue: "C3",
        meta: {},
      },
    },
  };

  it("shifts columns 1 to the right", () => {
    const newState = addColumnToLeft(initialState, "B");
    expect(newState["A-1"].rawValue).toEqual("A1");
    expect(newState["B-1"].rawValue).toEqual("");
    expect(newState["B-2"].rawValue).toEqual("");
    expect(newState["C-1"].rawValue).toEqual("B1");
    expect(newState["C-2"].rawValue).toEqual("B2");
    expect(newState["D-2"].rawValue).toEqual("C2");
    expect(newState["D-3"].rawValue).toEqual("C3");
  });
});

export {};
