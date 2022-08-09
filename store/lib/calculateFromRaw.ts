import { xAndYToPos } from "../../lib/xAndYtoPos";
import { CellCoord, CellValuesState } from "./CellValuesState";
import { Parser as FormulaParser } from "hot-formula-parser";

export const calculateFromRaw = (state: CellValuesState, rawValue: string) => {
  const parser = new FormulaParser();
  let reliesOnCells: string[] = [];

  const fn = (cellCoord: CellCoord, done: any) => {
    const cellId = xAndYToPos(
      cellCoord.column.index + 1,
      cellCoord.row.index + 1
    );
    reliesOnCells.push(cellId);
    done(state.value[cellId].calculatedValue);
  };

  const rangeFn = (
    startCellCoord: CellCoord,
    endCellCoord: CellCoord,
    done: any
  ) => {
    const fragment = [];
    for (
      let row = startCellCoord.row.index;
      row <= endCellCoord.row.index;
      row++
    ) {
      const colFragment = [];

      for (
        let col = startCellCoord.column.index;
        col <= endCellCoord.column.index;
        col++
      ) {
        const cellId = xAndYToPos(col + 1, row + 1);
        const val = state.value[cellId].calculatedValue;
        colFragment.push(val);
        reliesOnCells.push(cellId);
      }
      fragment.push(colFragment);
    }

    if (fragment) {
      done(fragment);
    }
  };

  parser.on("callCellValue", fn);
  parser.on("callRangeValue", rangeFn);

  let calculatedValue = rawValue;
  if (rawValue.charAt(0) == "=") {
    const calculated = parser.parse(rawValue.substring(1));
    calculatedValue = calculated.error ?? calculated.result;
  }

  return {
    calculatedValue,
    reliesOnCells,
  };
};
