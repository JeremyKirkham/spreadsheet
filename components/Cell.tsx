import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { selectedCell, update } from "../store/slices/selectedCellSlice";
import { cellValues, setCellValue } from "../store/slices/cellValuesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPos";
import { ThemeContext } from "../contexts/ThemeContext";
import {
  addCell,
  clearRange,
  selectedRange,
  setMouseDown,
} from "../store/slices/selectedRangeSlice";
import { columnWidths } from "../store/slices/columnWidthsSlice";
import { indexToAlpha } from "../lib/indexToAlpha";
import { CellValue } from "../store/lib/CellValuesState";

interface Props {
  height: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, height }) => {
  const { fontColor, lightColor, darkColor, highlightedColor, selectedColor } =
    useContext(ThemeContext);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [localRaw, setLocalRaw] = useState<string>("");
  const [localValue, setLocalValue] = useState<CellValue>({
    rawValue: "",
    calculatedValue: "",
    meta: {
      format: "text",
    },
  });
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const selectedRangeValue = useAppSelector(selectedRange);
  const columnWidthValues = useAppSelector(columnWidths);
  const inputRef = useRef<HTMLInputElement>(null);
  const width = columnWidthValues[indexToAlpha(x)];

  const pos = xAndYToPos(x, y);

  useEffect(() => {
    if (selectedRangeValue.start && selectedRangeValue.end) {
      const isH =
        x >= selectedRangeValue.start?.x &&
        x <= selectedRangeValue.end?.x &&
        y >= selectedRangeValue.start?.y &&
        y <= selectedRangeValue.end?.y;
      setIsHighlighted(isH);
    } else {
      setIsHighlighted(false);
    }
  }, [selectedRangeValue, x, y]);

  useEffect(() => {
    if (selectedCellValue == pos) {
      setIsSelected(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
    } else {
      setIsSelected(false);
    }
  }, [selectedCellValue, pos]);

  useEffect(() => {
    const cellValue = currentCellValues[pos];
    if (cellValue) {
      setLocalValue(cellValue);
      setLocalRaw(cellValue.rawValue);
    }
  }, [currentCellValues, pos]);

  const onFocus = () => {
    dispatch(update(pos));
  };

  const onTab = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Tab") {
      e.preventDefault();
    }
  };

  const onBlur = () => {
    dispatch(
      setCellValue({
        key: pos,
        rawValue: localRaw,
        propagateChanges: true,
      })
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalRaw(e.target.value);
    dispatch(
      setCellValue({
        key: pos,
        rawValue: e.target.value,
        propagateChanges: false,
      })
    );
  };

  const onMouseOver = () => {
    dispatch(addCell(pos));
  };
  const onMouseDown = () => {
    dispatch(update(pos));
    dispatch(clearRange());
    dispatch(setMouseDown(true));
    dispatch(addCell(pos));
  };
  const onMouseUp = () => {
    dispatch(setMouseDown(false));
  };
  const onClick = () => {
    dispatch(clearRange());
  };

  return (
    <>
      <div
        className={`cell ${isHighlighted ? "highlighted" : null}`}
        id={pos}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        <div className="calculatedValue">
          <span>
            {localValue.meta.format == "currency" && "$"}
            {localValue.calculatedValue}
          </span>
        </div>
        <input
          value={isSelected ? localRaw : localValue.calculatedValue ?? ""}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onTab}
          ref={inputRef}
        ></input>
        <div className="dragger"></div>
      </div>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: ${height}px;
          flex-shrink: 0;
          display: flex;
          border-left: solid 1px rgba(0, 0, 0, 0);
          border-top: solid 1px rgba(0, 0, 0, 0);
          border-right: solid 1px ${darkColor};
          border-bottom: solid 1px ${darkColor};
          background: ${isHighlighted ? highlightedColor : lightColor};
          color: ${fontColor};
          border: ${isSelected ? `solid 1px ${selectedColor}` : "default"};
          position: relative;
        }
        .calculatedValue {
          width: ${width - 3}px;
          overflow: hidden;
          height: ${height}px;
          line-height: ${height - 4}px;
          padding: 0px 2px;
          color: ${localValue.meta.color ?? "default"};
          background-color: ${localValue.meta.backgroundColor ?? "default"};
          font-family: ${localValue.meta.font ?? "default"};
          font-weight: ${localValue.meta.fontWeight ?? "normal"};
          font-size: ${localValue.meta.fontSize ?? 12}px;
          font-style: ${localValue.meta.fontStyle ?? "normal"};
          text-align: ${localValue.meta.textAlign ?? "left"};
        }
        .calculatedValue > span {
          width: 100%;
          display: inline-block;
          vertical-align: ${localValue.meta.horizontalAlign ?? "middle"};
          line-height: normal;
          margin: 1px 0;
          visibility: ${isSelected ? "hidden" : "show"};
          text-decoration: ${localValue.meta.textDecoration ?? "none"};
        }
        input {
          outline: none;
          border: none;
          height: 100%;
          width: ${width - 2}px;
          cursor: default;
          background: ${isHighlighted ? highlightedColor : lightColor};
          color: ${fontColor};
          position: absolute;
          top: 0;
          left: 0;
          visibility: ${isSelected ? "show" : "hidden"};
        }
        .dragger {
          width: 8px;
          height: 8px;
          background: ${selectedColor};
          position: absolute;
          right: -3px;
          bottom: -3px;
          z-index: 9;
          flex-shrink: 0;
          display: ${isSelected ? "block" : "none"};
          cursor: grab;
        }
      `}</style>
    </>
  );
};
