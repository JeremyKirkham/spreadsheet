import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { indexToAlpha } from "../lib/indexToAlpha";
import { posToXAndY } from "../lib/xAndYtoPost";
import { cellValues, setCellValue } from "../store/cellValuesSlice";
import { selectedCell } from "../store/selectedCellSlice";

export const SheetMenu: React.FC = () => {
  const [localValue, setLocalValue] = useState("");
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();
  const splitVal = posToXAndY(selectedCellValue);
  const selectedX = splitVal.x;
  const selectedY = splitVal.y;

  useEffect(() => {
    setLocalValue(currentCellValues[selectedCellValue]?.rawValue ?? "");
  }, [currentCellValues, selectedCellValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const range = () => {
    return null;
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCellValue({ key: selectedCellValue, rawValue: e.target.value })
    );
  };

  return (
    <>
      <div className="secondmenu">
        <div className="selectedCells">
          {selectedX ? `${indexToAlpha(selectedX)}${selectedY}` : null}
        </div>
        <div className="cellInput">
          <input
            placeholder="Cell input"
            value={localValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </div>
      <style jsx>{`
        .secondmenu {
          height: 30px;
          width: 100%;
          background: #f2f2f2;
          border-bottom: 1px solid #c0c0c0;
          display: flex;
        }
        .selectedCells {
          border-right: 1px solid #c0c0c0;
          height: 30px;
          line-height: 30px;
          width: 60px;
          padding: 0px 4px;
          text-align: center;
        }
        .cellInput {
          flex-grow: 1;
          background: white;
        }
        input {
          outline: none;
          border: none;
          height: 29px;
          width: 100%;
          padding: 0px 4px;
        }
      `}</style>
    </>
  );
};
