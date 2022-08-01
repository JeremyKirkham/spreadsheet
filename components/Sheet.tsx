import { useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";
import { Provider } from "react-redux";
import { store } from "../store";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const rowCount = 100;

export const Sheet: React.FC = () => {
  const [columns, setColumns] = useState(alphabet);
  const [rows, setRows] = useState(Array.from(Array(rowCount).keys()));
  const [colWidth, setColWidth] = useState(150);

  return (
    <>
      <Provider store={store}>
        <SelectedCellProvider>
          <SheetMenu />
          <div className="sheetBody">
            <SheetHeaderRow width={colWidth} columns={columns} />
            {rows.map((row, i) => {
              return (
                <Row key={i} row={i + 1}>
                  {columns.map((col, j) => {
                    return (
                      <Cell x={j + 1} y={i + 1} key={j} width={colWidth} />
                    );
                  })}
                </Row>
              );
            })}
          </div>
        </SelectedCellProvider>
      </Provider>
      <style jsx>{`
        .sheetBody {
          overflow-y: auto;
          overflow-x: auto;
          height: calc(100vh - 70px);
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
