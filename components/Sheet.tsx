import { useContext, useState } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";
import { FixedSizeList as List } from "react-window";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { ActionMenu } from "./menu/ActionMenu";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsFileSpreadsheetFill } from "react-icons/bs";
import { useAppSelector } from "../hooks/store";
import { columnWidths } from "../store/columnWidthsSlice";

const rowCount = 100;

export const Sheet: React.FC = () => {
  const { darkColor, mediumColor, borderColor } = useContext(ThemeContext);
  const columns = useAppSelector(columnWidths);
  const [rows] = useState(Array.from(Array(rowCount).keys()));
  const [rowHeight] = useState(24);
  const { height } = useWindowDimensions();

  const RowChild = ({ index, style }: { index: number; style: any }) => {
    if (index == 0) {
      return (
        <SheetHeaderRow columns={Object.keys(columns)} height={rowHeight} />
      );
    } else {
      return (
        <Row style={style} row={index} height={rowHeight}>
          {Object.keys(columns).map((col, j) => {
            return <Cell x={j + 1} y={index} key={j} height={rowHeight} />;
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
      )}
      <style jsx>{`
        .loader {
          text-align: center;
          color: ${darkColor};
          margin-top: 100px;
        }
      `}</style>
    </>
  );
};
