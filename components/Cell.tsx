import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";
import { Parser as FormulaParser } from "hot-formula-parser";

interface Props {
  width: number;
  x: string;
  y: number;
}

const parser = new FormulaParser();

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const selectedCell = useContext(SelectedCellContext);
  const [rawValue, setRawValue] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<string>("");
  const isSelected = selectedCell.x === x && selectedCell.y === y;

  useEffect(() => {
    if (isSelected) {
      setRawValue(selectedCell.rawValue ?? "");
    }
  }, [isSelected, selectedCell.rawValue]);

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
    selectedCell.setRawValue(rawValue);
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
    selectedCell.setRawValue(e.target.value);
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
      <input
        className="cell"
        value={rawValue}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        onChange={onChange}
      ></input>
      <div className="dragger"></div>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: 30px;
          flex-shrink: 0;
          border: none;
          border-left: solid 1px rgba(0, 0, 0, 0);
          border-top: solid 1px rgba(0, 0, 0, 0);
          border-right: solid 1px #e2e3e3;
          border-bottom: solid 1px #e2e3e3;
          outline: none;
          background: ${isHighlighted() ? "#E8F0FD" : null};
          cursor: default;
          margin-right: ${isSelected ? "-8px" : "none"};
          border: ${isSelected ? "solid 1px blue" : "default"};
        }
        .dragger {
          width: 8px;
          height: 8px;
          background: blue;
          position: relative;
          top: 24px;
          left: 2px;
          z-index: 999999;
          flex-shrink: 0;
          display: ${isSelected ? "block" : "none"};
          cursor: grab;
        }
      `}</style>
    </>
  );
};
