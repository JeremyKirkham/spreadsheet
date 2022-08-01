import { useAppSelector } from "../hooks/store";
import { selectedCellPosition } from "../store/selectedCellSlice";

interface Props {
  width: number;
  columns: any[];
}

export const SheetHeaderRow: React.FC<Props> = ({ width, columns }) => {
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
        .sheetHeader {
          position: sticky;
          top: 0;
          z-index: 9;
        }
        .inner {
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
          position: sticky;
          left: 0;
        }
        .cellHeader.selected {
          background: #e8eaed;
        }
      `}</style>
    </>
  );
};
