import { ColumnHeader } from "./ColumnHeader";
import { RowColKey } from "./RowColKey";

interface Props {
  width: number;
  height: number;
  columns: string[];
}

export const SheetHeaderRow: React.FC<Props> = ({ height, columns }) => {
  return (
    <>
      <div className="inner">
        <RowColKey height={height} />
        {columns.map((c, i) => {
          return <ColumnHeader key={i} height={height} c={c} i={i} />;
        })}
      </div>
      <style jsx>{`
        .inner {
          display: flex;
        }
      `}</style>
    </>
  );
};
