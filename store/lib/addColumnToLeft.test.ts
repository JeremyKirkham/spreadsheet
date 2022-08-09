import { expect } from "@jest/globals";
import { addColumnToLeft } from "./addColumnToLeft";

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

const initialWithDependencies = {
  value: {
    "A-1": {
      rawValue: "= B1 + C2",
      calculatedValue: "3",
      meta: {},
      reliesOnCells: ["B-1", "C-2"],
    },
    "B-1": {
      rawValue: "1",
      calculatedValue: "1",
      meta: {},
    },
    "C-2": {
      rawValue: "2",
      calculatedValue: "2",
      meta: {},
    },
  },
};

describe("addColumnToLeft", () => {
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

  it("updates formulas", () => {
    const newState = addColumnToLeft(initialWithDependencies, "B");
    expect(newState["A-1"].calculatedValue).toEqual("3");
    expect(newState["A-1"].reliesOnCells).toEqual(["C-1", "D-2"]);
    expect(newState["A-1"].rawValue).toEqual("= C1 + D2");
    expect(newState["C-1"].rawValue).toEqual("1");
    expect(newState["D-2"].rawValue).toEqual("2");
  });
});

export {};
