import { useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export const Sheet: React.FC = () => {
  const [columns, setColumns] = useState(alphabet);
  const [rows, setRows] = useState(Array.from(Array(20).keys()));
  const [colWidth, setColWidth] = useState(150);

  return (
    <>
      <SelectedCellProvider>
        <SheetMenu />
        <div className="sheet">
          <SheetHeaderRow width={colWidth} columns={columns} />
          <div className="sheetBody">
            {rows.map((row, i) => {
              return (
                <Row key={i} row={i + 1}>
                  {columns.map((col, j) => {
                    return <Cell x={col} y={i + 1} key={j} width={colWidth} />;
                  })}
                </Row>
              );
            })}
          </div>
        </div>
      </SelectedCellProvider>
      <style jsx>{`
        .sheet {
          overflow-y: auto;
          overflow-x: auto;
          width: 100%;
          height: 100%;
        }
        .sidebarcol {
          height: 30px;
          background: #f2f2f2;
          border-bottom: 1px solid #c0c0c0;
        }
        .sidebarcol:first-of-type {
          border-top: 1px solid #c0c0c0;
        }
      `}</style>
    </>
  );
};
