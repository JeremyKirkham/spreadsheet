import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";
import { Parser as FormulaParser } from "hot-formula-parser";
import { CellValuesContext } from "../contexts/CellValuesContext";

interface CellPos {
  index: number;
  label: string;
  isAbsolute: boolean;
}
interface CellCoord {
  label: string;
  row: CellPos;
  column: CellPos;
}

interface Props {
  width: number;
  x: number;
  y: number;
}

const parser = new FormulaParser();

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const selectedCell = useContext(SelectedCellContext);
  const { cellValues, setCellValue } = useContext(CellValuesContext);
  const [rawValue, setRawValue] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<string>("");
  const isSelected = selectedCell.x === x && selectedCell.y === y;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (cellCoord: CellCoord, done: any) => {
      const cell =
        cellValues[`${cellCoord.column.index + 1}${cellCoord.row.index + 1}`]
          .rawValue;
      done(cell);
    };

    parser.on("callCellValue", fn);

    return () => parser.off("callCellValue", fn);
  }, [cellValues]);

  useEffect(() => {
    if (isSelected) {
      setRawValue(cellValues[`${x}${y}`]?.rawValue ?? "");
      inputRef.current?.focus();
    }
  }, [isSelected, cellValues, x, y]);

  useEffect(() => {
    if (rawValue.charAt(0) == "=") {
      const calculated = parser.parse(rawValue.substring(1));
      setCalculatedValue(calculated.result);
    } else {
      setCalculatedValue(rawValue);
    }
  }, [rawValue]);

  const isHighlighted = (): boolean => {
    if (selectedCell.highlightedRange != null) {
      const start = selectedCell.highlightedRange.start;
      const end = selectedCell.highlightedRange.end;

      if (start.x === end.x && start.y === end.y) {
        return false;
      }

      const startY = start.y < end.y ? start.y : end.y;
      const startX = start.x < end.x ? start.x : end.x;
      const endY = start.y < end.y ? end.y : start.y;
      const endX = start.x < end.x ? end.x : start.x;

      return y >= startY && y <= endY && x >= startX && x <= endX;
    }
    return false;
  };

  const onFocus = () => {
    selectedCell.setX(x);
    selectedCell.setY(y);
    selectedCell.setHighlightedRange({
      start: {
        x,
        y,
      },
      end: {
        x,
        y,
      },
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCellValue(x, y, e.target.value);
    setRawValue(e.target.value);
  };

  const onMouseOver = () => {
    if (selectedCell.mousedown) {
      selectedCell.setHighlightedRange({
        end: {
          x,
          y,
        },
      });
    }
  };

  return (
    <>
      <div className="cell" id={`${x}${y}`} onClick={onFocus}>
        <input
          value={isSelected ? rawValue : calculatedValue}
          onFocus={onFocus}
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
