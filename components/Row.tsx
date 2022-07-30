import { PropsWithChildren, useContext } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

export const Row: React.FC<PropsWithChildren<{ row: number }>> = ({
  row,
  children,
}) => {
  const selectedCell = useContext(SelectedCellContext);

  return (
    <>
      <div className="sheetRow">
        <div
          className={`rowHeader ${selectedCell.y === row ? "selected" : null}`}
        >
          {row}
        </div>
        {children}
      </div>
      <style jsx>{`
        .sheetRow {
          height: 30px;
          display: flex;
          line-heigth: 30px;
        }
        .rowHeader {
          width: 60px;
          background: #f2f2f2;
          flex-shrink: 0;
          text-align: center;
          border-bottom: solid 1px #c0c0c0;
          border-right: solid 1px #c0c0c0;
        }
        .rowHeader.selected {
          background: #e8eaed;
        }
      `}</style>
    </>
  );
};
