import { PropsWithChildren } from "react";
import { useAppSelector } from "../hooks/store";
import { selectedCell } from "../store/selectedCellSlice";

export const Row: React.FC<PropsWithChildren<{ row: number }>> = ({
  row,
  children,
}) => {
  const selectedCellValue = useAppSelector(selectedCell);

  return (
    <>
      <div className="sheetRow">
        <div
          id={`row-${row}`}
          className={`rowHeader ${
            parseInt(selectedCellValue[1]) === row ? "selected" : null
          }`}
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
          position: sticky;
          left: 0;
        }
        .rowHeader.selected {
          background: #e8eaed;
        }
      `}</style>
    </>
  );
};
