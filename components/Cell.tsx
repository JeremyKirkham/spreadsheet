import { ChangeEvent, useEffect, useRef, useState } from "react";
import { selectedCell, update } from "../store/selectedCellSlice";
import { CellValue, cellValues, setCellValue } from "../store/cellValuesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPost";

interface Props {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, width, height }) => {
  const [localRaw, setLocalRaw] = useState<string>("");
  const [localValue, setLocalValue] = useState<CellValue>({
    rawValue: "",
    calculatedValue: "",
    format: "text",
  });
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const inputRef = useRef<HTMLInputElement>(null);

  const pos = xAndYToPos(x, y);

  useEffect(() => {
    if (selectedCellValue == pos) {
      setIsSelected(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
    } else {
      setIsSelected(false);
    }
  }, [selectedCellValue, pos]);

  useEffect(() => {
    const cellValue = currentCellValues[pos];
    if (cellValue) {
      setLocalValue(cellValue);
      setLocalRaw(cellValue.rawValue);
    }
  }, [currentCellValues, pos]);

  const isHighlighted = (): boolean => {
    return false;
  };

  const onFocus = () => {
    dispatch(update(pos));
  };

  const onBlur = () => {
    dispatch(
      setCellValue({
        key: pos,
        rawValue: localRaw,
        propagateChanges: true,
      })
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalRaw(e.target.value);
    dispatch(
      setCellValue({
        key: pos,
        rawValue: e.target.value,
        propagateChanges: false,
      })
    );
  };

  const onMouseOver = () => {};

  return (
    <>
      <div className="cell" id={pos} onClick={onFocus}>
        <div className="calculatedValue">
          {localValue.format == "currency" && "$"}
          {localValue.calculatedValue}
        </div>
        <input
          value={isSelected ? localRaw : localValue.calculatedValue ?? ""}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseOver={onMouseOver}
          onChange={onChange}
          ref={inputRef}
        ></input>
        <div className="dragger"></div>
      </div>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: ${height}px;
          flex-shrink: 0;
          display: flex;
          border-left: solid 1px rgba(0, 0, 0, 0);
          border-top: solid 1px rgba(0, 0, 0, 0);
          border-right: solid 1px #e2e3e3;
          border-bottom: solid 1px #e2e3e3;
          background: ${isHighlighted() ? "#E8F0FD" : null};
          border: ${isSelected ? "solid 1px blue" : "default"};
          position: relative;
        }
        .calculatedValue {
          width: ${width - 3}px;
          height: ${height}px;
          line-height: ${height - 2}px;
          padding: 0px 2px;
        }
        input {
          outline: none;
          border: none;
          width: ${width - 2}px;
          height: ${height - 2}px;
          cursor: default;
          background: white;
          visibility: ${isSelected ? "show" : "hidden"};
          position: absolute;
          top: 0;
          left: 0;
        }
        .dragger {
          width: 8px;
          height: 8px;
          background: blue;
          position: absolute;
          right: -3px;
          bottom: -3px;
          z-index: 9;
          flex-shrink: 0;
          display: ${isSelected ? "block" : "none"};
          cursor: grab;
        }
      `}</style>
    </>
  );
};
