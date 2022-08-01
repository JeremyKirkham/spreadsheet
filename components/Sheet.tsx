import { useEffect, useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";
import { Provider } from "react-redux";
import { store } from "../store";
import { FixedSizeList as List } from "react-window";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const rowCount = 100;

export const Sheet: React.FC = () => {
  const [columns, setColumns] = useState(alphabet);
  const [rows, setRows] = useState(Array.from(Array(rowCount).keys()));
  const [colWidth, setColWidth] = useState(150);
  const { height, width } = useWindowDimensions();

  const RowChild = ({ index, style }: { index: number; style: any }) => {
    if (index == 0) {
      return <SheetHeaderRow width={colWidth} columns={columns} />;
    } else {
      return (
        <Row style={{ ...style, pointerEvents: "auto" }} row={index}>
          {columns.map((col, j) => {
            return <Cell x={j + 1} y={index} key={j} width={colWidth} />;
          })}
        </Row>
      );
    }
  };

  if (height == 0) {
    return <>Loading...</>;
  }

  return (
    <>
      <Provider store={store}>
        <SelectedCellProvider>
          <SheetMenu />
          <div className="sheetBody">
            <List
              height={height - 70}
              itemCount={rows.length + 1}
              itemSize={30}
              width="100%"
            >
              {RowChild}
            </List>
          </div>
        </SelectedCellProvider>
      </Provider>
      <style jsx>{`
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
