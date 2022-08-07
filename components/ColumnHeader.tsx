import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useClickOutside } from "../hooks/useClickOutside";
import { columnWidths, setColumnWidth } from "../store/columnWidthsSlice";
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
  const [size, setSize] = useState({ x: width, y: 0 });
  const [mouseUpEnd, setMouseUpEnd] = useState(false);

  const handler = (mouseDownEvent: any) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      const newX = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      setSize((currentSize) => ({
        x: newX,
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    }

    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      setMouseUpEnd(true);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  useEffect(() => {
    if (mouseUpEnd) {
      dispatch(
        setColumnWidth({
          key: c,
          width: size.x,
        })
      );
      setMouseUpEnd(false);
    }
  }, [size, c, dispatch, mouseUpEnd]);

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
        {selected && <div onMouseDown={handler} className="rightBorder"></div>}
      </div>
      <style jsx>{`
        .cellHeader {
          width: ${size.x}px;
          text-align: center;
          flex-shrink: 0;
          background: ${mediumColor};
          height: ${height}px;
          line-height: ${height}px;
          border-right: solid 1px ${borderColor};
          border-bottom: solid 1px ${borderColor};
          color: ${fontColor};
          display: flex;
          justify-content: space-between;
        }
        .rightBorder {
          border-right: solid 4px ${borderColor};
          width: 0px;
          height: ${height}px;
          cursor: grab;
        }
        .cellHeader.selected {
          background: ${darkColor};
        }
      `}</style>
    </>
  );
};
