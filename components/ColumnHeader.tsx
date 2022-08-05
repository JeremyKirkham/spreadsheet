import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppSelector } from "../hooks/store";
import { selectedCellPosition } from "../store/selectedCellSlice";
import { selectedRange } from "../store/selectedRangeSlice";

interface Props {
  width: number;
  height: number;
  c: string;
  i: number;
}

export const ColumnHeader: React.FC<Props> = ({ width, height, c, i }) => {
  const { fontColor, mediumColor, borderColor, darkColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);
  const selectedRangeValue = useAppSelector(selectedRange);

  const isSelected =
    cellPos.x === i + 1 ||
    (selectedRangeValue.start &&
      selectedRangeValue.start!.x <= i + 1 &&
      selectedRangeValue.end!.x >= i + 1);

  return (
    <>
      <div
        id={`header-${c}`}
        className={`cellHeader ${isSelected ? "selected" : null}`}
      >
        {c}
      </div>
      <style jsx>{`
        .cellHeader {
          width: ${width}px;
          text-align: center;
          flex-shrink: 0;
          background: ${mediumColor};
          height: ${height}px;
          line-height: ${height}px;
          border-right: solid 1px ${borderColor};
          border-bottom: solid 1px ${borderColor};
          color: ${fontColor};
        }
        .cellHeader.selected {
          background: ${darkColor};
        }
      `}</style>
    </>
  );
};
