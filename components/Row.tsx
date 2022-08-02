import { PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/store";
import { selectedCellPosition } from "../store/selectedCellSlice";

export const Row: React.FC<
  PropsWithChildren<{ row: number; style: any; height: number }>
> = ({ row, style, height, children }) => {
  const cellPos = useAppSelector(selectedCellPosition);

  return (
    <>
      <div className="sheetRow" style={style}>
        <div
          id={`row-${row}`}
          className={`rowHeader ${cellPos.y === row ? "selected" : null}`}
        >
          {row}
        </div>
        {children}
      </div>
      <style jsx>{`
        .sheetRow {
          height: ${height}px;
          display: flex;
          line-heigth: ${height}px;
        }
        .rowHeader {
          width: 60px;
          background: #f2f2f2;
          flex-shrink: 0;
          text-align: center;
          border-bottom: solid 1px #c0c0c0;
          border-right: solid 1px #c0c0c0;
          position: sticky;
          left: 0;
          z-index: 10;
        }
        .rowHeader.selected {
          background: #e8eaed;
        }
      `}</style>
    </>
  );
};
