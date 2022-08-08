import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { setRowHeight } from "../store/rowHeightsSlice";
import { selectedCellPosition } from "../store/selectedCellSlice";
import { selectedRange } from "../store/selectedRangeSlice";

export const Row: React.FC<
  PropsWithChildren<{ row: number; style: any; height: number; resizeRef: any }>
> = ({ row, style, height, children, resizeRef }) => {
  const { fontColor, mediumColor, borderColor, darkColor, selectedColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);
  const selectedRangeValue = useAppSelector(selectedRange);
  const [size, setSize] = useState({ x: 0, y: height });
  const [resizeY, setResizeY] = useState(height);
  const [mouseUpEnd, setMouseUpEnd] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const dispatch = useAppDispatch();

  const isSelected =
    cellPos.y === row ||
    (selectedRangeValue.start &&
      selectedRangeValue.start!.y <= row &&
      selectedRangeValue.end!.y >= row);

  const handler = (mouseDownEvent: any) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    setGrabbing(true);

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      const newY = startSize.y - startPosition.y + mouseMoveEvent.pageY;
      if (newY > 24) {
        setResizeY(newY);
        setSize((currentSize) => ({
          y: newY,
          x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        }));
      }
    }

    function onMouseUp() {
      setGrabbing(false);
      setMouseUpEnd(true);
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  useEffect(() => {
    if (mouseUpEnd) {
      dispatch(
        setRowHeight({
          key: `${row}`,
          height: size.y,
        })
      );
      setMouseUpEnd(false);
      resizeRef.current?.resetAfterIndex(row);
    }
  }, [size, row, dispatch, mouseUpEnd, resizeRef]);

  return (
    <>
      <div className="sheetRow" style={style}>
        <div
          id={`row-${row}`}
          className={`rowHeader ${isSelected ? "selected" : null}`}
        >
          <span className="headerVal">{row}</span>
          <div onMouseDown={handler} className="bottomBorder"></div>
        </div>
        {grabbing && <div className="resizeLine"></div>}
        {children}
      </div>
      <style jsx>{`
        .sheetRow {
          height: ${size.y}px;
          display: flex;
          line-height: 24px;
          z-index: ${grabbing ? 9999 : "auto"};
        }
        .rowHeader {
          height: ${size.y}px;
          width: 60px;
          background: ${mediumColor};
          flex-shrink: 0;
          align-items: center;
          border-bottom: solid 1px ${borderColor};
          border-right: solid 1px ${borderColor};
          left: 0;
          z-index: 10;
          color: ${fontColor};
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .rowHeader.selected {
          background: ${darkColor};
        }
        .headerVal {
          flex: 0 1 auto;
          height: ${size.y}px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }
        .bottomBorder {
          flex: 0 1 auto;
          margin-top: auto;
          height: 10px;
          width: 60px;
          cursor: s-resize;
          position: relative;
          z-index: 2;
          border-bottom: solid 5px
            ${grabbing ? borderColor : "rgba(0, 0, 0, 0)"};
        }
        .bottomBorder:hover {
          border-bottom: solid 5px ${borderColor};
        }
        .resizeLine {
          position: absolute;
          top: ${resizeY}px;
          left: 0;
          width: 100%;
          height: 0px;
          border-bottom: 1px solid ${selectedColor};
          z-index: 999;
        }
      `}</style>
    </>
  );
};
