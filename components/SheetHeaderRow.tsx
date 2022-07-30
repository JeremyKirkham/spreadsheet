import { useContext } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

interface Props {
  width: number;
  columns: any[];
}

export const SheetHeaderRow: React.FC<Props> = ({ width, columns }) => {
  const selectedCell = useContext(SelectedCellContext);

  return (
    <>
      <div className="sheetHeader">
        <div className="cellHeader"></div>
        {columns.map((c, i) => {
          return (
            <div
              key={i}
              className={`cellHeader ${
                selectedCell.x === c ? "selected" : null
              }`}
            >
              {c}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .sheetHeader {
          display: flex;
        }
        .cellHeader {
          width: ${width}px;
          text-align: center;
          flex-shrink: 0;
          background: #f2f2f2;
          height: 30px;
          border-right: solid 1px #c0c0c0;
          border-bottom: solid 1px #c0c0c0;
        }
        .cellHeader:first-of-type {
          width: 60px;
        }
        .cellHeader.selected {
          background: #e8eaed;
        }
      `}</style>
    </>
  );
};
