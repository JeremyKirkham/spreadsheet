import { WritableDraft } from "immer/dist/internal";
import { alphaToIndex, indexToAlpha } from "../../lib/indexToAlpha";
import { posToXAndY, xAndYToPos } from "../../lib/xAndYtoPos";
import { CellValuesState } from "./CellValuesState";

export const addColumnToLeft = (
  state: CellValuesState,
  key: string
): WritableDraft<CellValuesState["value"]> => {
  const keyIndex = alphaToIndex(key);
  const newValArr = Object.keys(state.value).map((k) => {
    const currentValue = state.value[k];

    const newReliesOnCells = currentValue.reliesOnCells?.map((c) => {
      const cellKey = posToXAndY(c);
      if (cellKey.x >= keyIndex) {
        const existKey = `${indexToAlpha(cellKey.x)}${cellKey.y}`;
        const newKey = `${indexToAlpha(cellKey.x + 1)}${cellKey.y}`;
        const regex = new RegExp(existKey, "g");
        currentValue.rawValue = currentValue.rawValue.replace(regex, newKey);
        return xAndYToPos(cellKey.x + 1, cellKey.y);
      } else {
        return c;
      }
    });

    const updatedCurrentValue = {
      ...currentValue,
      reliesOnCells: newReliesOnCells,
    };

    const destKey = posToXAndY(k);
    if (destKey.x < keyIndex) {
      return {
        [k]: updatedCurrentValue,
      };
    } else if (indexToAlpha(destKey.x) === key) {
      return {
        [k]: {
          rawValue: "",
          meta: {},
        },
        [xAndYToPos(destKey.x + 1, destKey.y)]: updatedCurrentValue,
      };
    } else {
      return {
        [xAndYToPos(destKey.x + 1, destKey.y)]: updatedCurrentValue,
      };
    }
  });

  return Object.assign({}, ...newValArr);
};
