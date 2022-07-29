import { PropsWithChildren, useState } from "react";

export const Row: React.FC<PropsWithChildren<{ row: number }>> = ({
  row,
  children,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <div className="sheetRow">
        <div className="rowHeader">{row + 1}</div>
        {children}
      </div>
      <style jsx>{`
        .sheetRow {
          height: 30px;
          display: flex;
          line-heigth: 30px;
        }
        .rowHeader {
          width: 40px;
          background: #f2f2f2;
          flex-shrink: 0;
          text-align: center;
          border-bottom: solid 1px #c0c0c0;
          border-top: ${row == 0 ? "solid 1px #c0c0c0" : "none"};
        }
      `}</style>
    </>
  );
};
