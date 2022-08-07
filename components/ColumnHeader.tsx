import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useClickOutside } from "../hooks/useClickOutside";
import { columnWidths } from "../store/columnWidthsSlice";
import { selectedCellPosition, update } from "../store/selectedCellSlice";
import { clearRange, selectedRange } from "../store/selectedRangeSlice";

interface Props {
  height: number;
  c: string;
  i: number;
}

export const ColumnHeader: React.FC<Props> = ({ height, c, i }) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useAppDispatch();
  const ref = useClickOutside(() => {
    if (selected) {
      setTimeout(() => {
        setSelected(false);
      }, 10);
    }
  });
  const { fontColor, mediumColor, borderColor, darkColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);
  const selectedRangeValue = useAppSelector(selectedRange);
  const columnWidthValues = useAppSelector(columnWidths);
  const width = columnWidthValues[c];

  const isSelected =
    cellPos.x === i + 1 ||
    (selectedRangeValue.start &&
      selectedRangeValue.start!.x <= i + 1 &&
      selectedRangeValue.end!.x >= i + 1) ||
    selected;

  const onClick = () => {
    setSelected(true);
    dispatch(update(""));
    dispatch(clearRange());
  };

  return (
    <>
      <div
        id={`header-${c}`}
        className={`cellHeader ${isSelected ? "selected" : null}`}
        onClick={onClick}
        ref={ref}
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
