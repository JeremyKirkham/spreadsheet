import { ChangeEvent, useContext } from "react";
import { CellValuesContext } from "../contexts/CellValuesContext";
import { SelectedCellContext } from "../contexts/SelectedCellContext";
import { indexToAlpha } from "../lib/indexToAlpha";

export const SheetMenu: React.FC = () => {
  const selectedCell = useContext(SelectedCellContext);
  const { cellValues, setCellValue } = useContext(CellValuesContext);

  const range = () => {
    if (selectedCell.highlightedRange != null) {
      const start = selectedCell.highlightedRange.start;
      const end = selectedCell.highlightedRange.end;

      if (start.x === end.x && start.y === end.y) {
        return null;
      }

      const startY = start.y < end.y ? start.y : end.y;
      const startX = start.x < end.x ? start.x : end.x;
      const endY = start.y < end.y ? end.y : start.y;
      const endX = start.x < end.x ? end.x : start.x;

      return `${indexToAlpha(startX)}${startY}:${indexToAlpha(endX)}${endY}`;
    }
    return null;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCellValue(selectedCell.x!, selectedCell.y!, e.target.value);
  };

  return (
    <>
      <div className="secondmenu">
        <div className="selectedCells">
          {range()
            ? range()
            : selectedCell.x
            ? `${indexToAlpha(selectedCell.x)}${selectedCell.y}`
            : null}
        </div>
        <div className="cellInput">
          <input
            placeholder="Cell input"
            value={
              cellValues[`${selectedCell.x}${selectedCell.y}`]?.rawValue ?? ""
            }
            onChange={onChange}
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
          width: 60px;
          padding: 0px 4px;
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
