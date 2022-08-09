import { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { ThemeContext } from "../contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  addColumnToLeft,
  addColumnToRight,
} from "../store/slices/cellValuesSlice";
import {
  columnWidths,
  setColumnWidth,
} from "../store/slices/columnWidthsSlice";
import {
  selectedCellPosition,
  update,
} from "../store/slices/selectedCellSlice";
import { clearRange, selectedRange } from "../store/slices/selectedRangeSlice";
import { Dropdown } from "./menu/Dropdown";
import { DropdownItem } from "./menu/DropdownItem";

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
  const { fontColor, mediumColor, borderColor, darkColor, selectedColor } =
    useContext(ThemeContext);
  const cellPos = useAppSelector(selectedCellPosition);
  const selectedRangeValue = useAppSelector(selectedRange);
  const columnWidthValues = useAppSelector(columnWidths);
  const width = columnWidthValues[c];
  const [size, setSize] = useState({ x: width, y: 0 });
  const [resizeX, setResizeX] = useState(0);
  const [mouseUpEnd, setMouseUpEnd] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const handler = (mouseDownEvent: any) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    setGrabbing(true);

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      const newX = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      if (newX > 20) {
        setResizeX(mouseMoveEvent.pageX);
        setSize((currentSize) => ({
          x: newX,
          y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
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

  const addColToLeft = (col: string) => {
    dispatch(addColumnToLeft({ key: col }));
    return undefined;
  };

  const addColToRight = (col: string) => {
    dispatch(addColumnToRight({ key: col }));
    return undefined;
  };

  return (
    <>
      <div
        id={`header-${c}`}
        className={`cellHeader ${isSelected ? "selected" : null}`}
        onClick={onClick}
        ref={ref}
      >
        <div className="moremenu">
          <Dropdown title="" minWidth={180}>
            <DropdownItem icon={BsPlusLg} onClick={() => addColToLeft(c)}>
              Insert 1 column left
            </DropdownItem>
            <DropdownItem icon={BsPlusLg} onClick={() => addColToRight(c)}>
              Insert 1 column right
            </DropdownItem>
          </Dropdown>
        </div>
        <span className="headerVal">{c}</span>
        <div onMouseDown={handler} className="rightBorder"></div>
      </div>
      {grabbing && <div className="resizeLine"></div>}
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
          justify-content: flex-start;
          position: relative;
        }
        .moremenu {
          display: ${selected ? "block" : "none"};
          flex: 0 1 auto;
          z-index: 2;
        }
        .cellHeader:hover > .moremenu {
          display: block;
        }
        .headerVal {
          flex: 0 1 auto;
          width: ${size.x}px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }
        .rightBorder {
          flex: 0 1 auto;
          margin-left: auto;
          width: 10px;
          height: ${height}px;
          cursor: e-resize;
          position: relative;
          z-index: 2;
          border-right: solid 5px ${grabbing ? borderColor : "rgba(0, 0, 0, 0)"};
        }
        .rightBorder:hover {
          border-right: solid 5px ${borderColor};
        }
        .cellHeader.selected {
          background: ${darkColor};
        }
        .resizeLine {
          position: absolute;
          top: 0;
          left: ${resizeX}px;
          height: 100%;
          width: 0px;
          border-right: 1px solid ${selectedColor};
          z-index: 999;
        }
      `}</style>
    </>
  );
};
