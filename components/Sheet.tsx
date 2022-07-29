import { useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export const Sheet: React.FC = () => {
  const [columns, setColumns] = useState(alphabet);
  const [rows, setRows] = useState(Array.from(Array(300).keys()));
  const [colWidth, setColWidth] = useState(150);

  return (
    <>
      <SelectedCellProvider>
        <div className="sheet">
          <div className="sheetHeader">
            <div className="cellHeader"></div>
            {columns.map((c, i) => {
              return (
                <div key={i} className="cellHeader">
                  {c}
                </div>
              );
            })}
          </div>
          <div className="sheetBody">
            {rows.map((row, i) => {
              return (
                <Row key={i} row={i}>
                  {columns.map((col, j) => {
                    return <Cell x={col} y={i} key={j} width={colWidth} />;
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
        .sheetHeader {
          display: flex;
        }
        .cellHeader {
          width: ${colWidth}px;
          text-align: center;
          flex-shrink: 0;
          background: #f2f2f2;
          height: 30px;
          border-right: solid 1px #c0c0c0;
          border-bottom: solid 1px #c0c0c0;
        }
        .cellHeader:first-of-type {
          width: 50px;
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
