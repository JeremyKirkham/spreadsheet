import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { indexToAlpha } from "../lib/indexToAlpha";
import { posToXAndY } from "../lib/xAndYtoPos";
import { cellValues, setCellValue } from "../store/slices/cellValuesSlice";
import { selectedCell } from "../store/slices/selectedCellSlice";
import { selectedRangeSymbol } from "../store/slices/selectedRangeSlice";

export const SheetMenu: React.FC = () => {
  const {
    fontColor,
    fontPlaceholderColor,
    lightColor,
    mediumColor,
    borderColor,
  } = useContext(ThemeContext);
  const { setInMenu } = useContext(SelectedCellContext);
  const [localValue, setLocalValue] = useState("");
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const selectedRangeValue = useAppSelector(selectedRangeSymbol);
  const dispatch = useAppDispatch();
  const splitVal = posToXAndY(selectedCellValue);
  const selectedX = splitVal.x;
  const selectedY = splitVal.y;

  useEffect(() => {
    setLocalValue(currentCellValues[selectedCellValue]?.rawValue ?? "");
  }, [currentCellValues, selectedCellValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    dispatch(
      setCellValue({
        key: selectedCellValue,
        rawValue: e.target.value,
        propagateChanges: false,
      })
    );
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCellValue({
        key: selectedCellValue,
        rawValue: e.target.value,
        propagateChanges: true,
      })
    );
    setInMenu(false);
  };

  const onFocus = () => {
    setInMenu(true);
  };

  return (
    <>
      <div className="secondmenu">
        <div className="selectedCells">
          {selectedRangeValue ??
            (selectedX ? `${indexToAlpha(selectedX)}${selectedY}` : null)}
        </div>
        <div className="cellInput">
          <input
            placeholder="Cell input"
            value={localValue}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>
      </div>
      <style jsx>{`
        .secondmenu {
          height: 30px;
          width: 100%;
          background: ${mediumColor};
          border-bottom: 1px solid ${borderColor};
          display: flex;
        }
        .selectedCells {
          border-right: 1px solid ${borderColor};
          height: 30px;
          line-height: 30px;
          width: 60px;
          padding: 0px 4px;
          text-align: center;
          color: ${fontColor};
        }
        .cellInput {
          flex-grow: 1;
          background: ${lightColor};
        }
        ::placeholder {
          color: ${fontPlaceholderColor};
        }
        input {
          outline: none;
          border: none;
          height: 29px;
          width: 100%;
          padding: 0px 4px;
          background: none;
          color: ${fontColor};
        }
      `}</style>
    </>
  );
};
