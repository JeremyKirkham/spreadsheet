import { useContext, useRef } from "react";
import { SelectedCellProvider } from "../contexts/SelectedCellContext";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { SheetHeaderRow } from "./SheetHeaderRow";
import { SheetMenu } from "./SheetMenu";
import { VariableSizeList as List } from "react-window";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { ActionMenu } from "./menu/ActionMenu";
import { ThemeContext } from "../contexts/ThemeContext";
import { BsFileSpreadsheetFill } from "react-icons/bs";
import { useAppSelector } from "../hooks/store";
import { columnWidths } from "../store/columnWidthsSlice";
import { rowHeights } from "../store/rowHeightsSlice";

export const Sheet: React.FC = () => {
  const { darkColor } = useContext(ThemeContext);
  const rows = useAppSelector(rowHeights);
  const rowArray = Object.keys(rows);
  const columns = useAppSelector(columnWidths);
  const { height } = useWindowDimensions();
  const yourRef = useRef<any>(null);

  const RowChild = ({ index, style }: { index: number; style: any }) => {
    if (index == 0) {
      return <SheetHeaderRow columns={Object.keys(columns)} height={24} />;
    } else {
      return (
        <Row style={style} row={index} height={rows[index]} resizeRef={yourRef}>
          {Object.keys(columns).map((col, j) => {
            return <Cell x={j + 1} y={index} key={j} height={rows[index]} />;
          })}
        </Row>
      );
    }
  };

  const itemKey = (index: number, data: string[]) => {
    return data[index];
  };

  const getItemSize = (index: number) => rows[index];

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
              itemCount={rowArray.length + 1}
              itemData={rowArray}
              itemSize={getItemSize}
              itemKey={itemKey}
              width="100%"
              ref={yourRef}
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
