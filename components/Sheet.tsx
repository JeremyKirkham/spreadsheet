import { useContext, useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";
import { Provider } from "react-redux";
import { store } from "../store";
import { FixedSizeList as List } from "react-window";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { ActionMenu } from "./menu/ActionMenu";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsFileSpreadsheetFill } from "react-icons/bs";

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const rowCount = 100;

export const Sheet: React.FC = () => {
  const { darkColor, mediumColor, borderColor } = useContext(ThemeContext);
  const [columns] = useState(alphabet);
  const [rows] = useState(Array.from(Array(rowCount).keys()));
  const [colWidth] = useState(110);
  const [rowHeight] = useState(24);
  const { height } = useWindowDimensions();

  const RowChild = ({ index, style }: { index: number; style: any }) => {
    if (index == 0) {
      return (
        <SheetHeaderRow width={colWidth} columns={columns} height={rowHeight} />
      );
    } else {
      return (
        <Row style={style} row={index} height={rowHeight}>
          {columns.map((col, j) => {
            return (
              <Cell
                x={j + 1}
                y={index}
                key={j}
                width={colWidth}
                height={rowHeight}
              />
            );
          })}
        </Row>
      );
    }
  };

  const itemKey = (index: number, data: number[]) => {
    return data[index];
  };

  return (
    <>
      {height == 0 ? (
        <div className="loader">
          <BsFileSpreadsheetFill size={120} />
        </div>
      ) : (
        <Provider store={store}>
          <SelectedCellProvider>
            <ActionMenu />
            <SheetMenu />
            <div className="sheetBody">
              <List
                height={height}
                itemCount={rows.length + 1}
                itemData={rows}
                itemSize={rowHeight}
                itemKey={itemKey}
                width="100%"
              >
                {RowChild}
              </List>
            </div>
          </SelectedCellProvider>
        </Provider>
      )}
      <style jsx>{`
        .sidebarcol {
          height: ${rowHeight}px;
          background: ${mediumColor};
          border-bottom: 1px solid ${borderColor};
        }
        .loader {
          text-align: center;
          color: ${darkColor};
          margin-top: 100px;
        }
        .sidebarcol:first-of-type {
          border-top: 1px solid ${borderColor};
        }
      `}</style>
    </>
  );
};
