import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppSelector } from "../hooks/store";
import { selectedCellPosition } from "../store/selectedCellSlice";

interface Props {
  width: number;
  height: number;
  columns: any[];
}

export const SheetHeaderRow: React.FC<Props> = ({ width, height, columns }) => {
  const { fontColor, mediumColor, borderColor, darkColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);

  return (
    <>
      <div className="sheetHeader">
        <div className="inner">
          <div className="cellHeader"></div>
          {columns.map((c, i) => {
            return (
              <div
                key={i}
                id={`header-${c}`}
                className={`cellHeader ${
                  cellPos.x === i + 1 ? "selected" : null
                }`}
              >
                {c}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .inner {
          display: flex;
        }
        .cellHeader {
          width: ${width}px;
          text-align: center;
          flex-shrink: 0;
          background: ${mediumColor};
          height: ${height}px;
          line-height: ${height}px;
          border-right: solid 1px ${borderColor};
          border-bottom: solid 1px ${borderColor};
          color: ${fontColor};
        }
        .cellHeader:first-of-type {
          width: 60px;
          position: sticky;
          left: 0;
        }
        .cellHeader.selected {
          background: ${darkColor};
        }
      `}</style>
    </>
  );
};
