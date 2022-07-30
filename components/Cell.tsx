import { useContext, useState } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

interface Props {
  width: number;
  x: string;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const selectedCell = useContext(SelectedCellContext);
  const [rawValue, setRawValue] = useState<string>("");

  const isSelected = selectedCell.x === x && selectedCell.y === y;

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

  const onBlur = () => {
    selectedCell.setX();
    selectedCell.setY();
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
        onBlur={onBlur}
        onMouseOver={onMouseOver}
        onChange={(e) => setRawValue(e.target.value)}
      ></input>
      <div className="dragger"></div>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: 30px;
          flex-shrink: 0;
          border: none;
          border-left: solid 1px white;
          border-top: solid 1px white;
          border-right: solid 1px #f2f2f2;
          border-bottom: solid 1px #f2f2f2;
          outline: none;
          background: ${isHighlighted() ? "#E8F0FD" : null};
          cursor: default;
          margin-right: ${isSelected ? "-8px" : "none"};
        }
        .cell:focus {
          border: solid 1px blue;
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
