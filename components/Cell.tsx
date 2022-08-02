import { ChangeEvent, useEffect, useRef, useState } from "react";
import { update } from "../store/selectedCellSlice";
import { CellValue, cellValues, setCellValue } from "../store/cellValuesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPost";

interface Props {
  width: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const [localValue, setLocalValue] = useState<CellValue>({
    rawValue: "",
    calculatedValue: "",
  });
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const currentCellValues = useAppSelector(cellValues);
  const inputRef = useRef<HTMLInputElement>(null);

  const pos = xAndYToPos(x, y);

  useEffect(() => {
    const cellValue = currentCellValues[pos];
    if (cellValue) {
      setLocalValue(cellValue);
    }
  }, [currentCellValues, pos]);

  const isHighlighted = (): boolean => {
    return false;
  };

  const onFocus = () => {
    inputRef.current?.focus();
    dispatch(update(pos));
    setIsSelected(true);
  };

  const onBlur = () => {
    setIsSelected(false);
    dispatch(
      setCellValue({
        key: pos,
        rawValue: localValue.rawValue,
      })
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue({ rawValue: e.target.value });
  };

  const onMouseOver = () => {};

  return (
    <>
      <div className="cell" id={pos} onClick={onFocus}>
        <input
          value={
            isSelected ? localValue.rawValue : localValue.calculatedValue ?? ""
          }
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
          height: 30px;
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
          top: 24px;
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
