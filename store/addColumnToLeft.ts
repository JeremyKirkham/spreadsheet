import { WritableDraft } from "immer/dist/internal";
import { alphaToIndex, indexToAlpha } from "../lib/indexToAlpha";
import { posToXAndY, xAndYToPos } from "../lib/xAndYtoPos";
import { CellValuesState } from "./CellValuesState";

export const addColumnToLeft = (
  state: CellValuesState,
  key: string
): WritableDraft<CellValuesState["value"]> => {
  const keyIndex = alphaToIndex(key);
  const newValArr = Object.keys(state.value).map((k) => {
    const destKey = posToXAndY(k);
    if (destKey.x < keyIndex) {
      return {
        [k]: state.value[k],
      };
    } else if (indexToAlpha(destKey.x) === key) {
      return {
        [k]: {
          rawValue: "",
          meta: {},
        },
        [xAndYToPos(destKey.x + 1, destKey.y)]: state.value[k],
      };
    } else {
      return {
        [xAndYToPos(destKey.x + 1, destKey.y)]: state.value[k],
      };
    }
  });

  return Object.assign({}, ...newValArr);
};
