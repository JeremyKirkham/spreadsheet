import { PropsWithChildren, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppSelector } from "../hooks/store";
import { selectedCellPosition } from "../store/selectedCellSlice";
import { selectedRange } from "../store/selectedRangeSlice";

export const Row: React.FC<
  PropsWithChildren<{ row: number; style: any; height: number }>
> = ({ row, style, height, children }) => {
  const { fontColor, mediumColor, borderColor, darkColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);
  const selectedRangeValue = useAppSelector(selectedRange);

  const isSelected =
    cellPos.y === row ||
    (selectedRangeValue.start &&
      selectedRangeValue.start!.y <= row &&
      selectedRangeValue.end!.y >= row);

  return (
    <>
      <div className="sheetRow" style={style}>
        <div
          id={`row-${row}`}
          className={`rowHeader ${isSelected ? "selected" : null}`}
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
          background: ${mediumColor};
          flex-shrink: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: solid 1px ${borderColor};
          border-right: solid 1px ${borderColor};
          position: sticky;
          left: 0;
          z-index: 10;
          color: ${fontColor};
        }
        .rowHeader.selected {
          background: ${darkColor};
        }
      `}</style>
    </>
  );
};
