import { ColumnHeader } from "./ColumnHeader";
import { RowColKey } from "./RowColKey";

interface Props {
  width: number;
  height: number;
  columns: any[];
}

export const SheetHeaderRow: React.FC<Props> = ({ width, height, columns }) => {
  return (
    <>
      <div className="sheetHeader">
        <div className="inner">
          <RowColKey height={height} />
          {columns.map((c, i) => {
            return (
              <ColumnHeader key={i} width={width} height={height} c={c} i={i} />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .inner {
          display: flex;
        }
      `}</style>
    </>
  );
};
