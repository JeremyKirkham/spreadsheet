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
      inputRef.current?.focus();
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
        }
        input {
          outline: none;
          border: none;
          width: ${width - 2}px;
          cursor: default;
          background: none;
        }
        .dragger {
          width: 8px;
          height: 8px;
          background: blue;
          position: relative;
          top: ${height - 6}px;
          left: -5px;
          z-index: 999999;
          flex-shrink: 0;
          display: ${isSelected ? "block" : "none"};
          cursor: grab;
        }
      `}</style>
    </>
  );
};
