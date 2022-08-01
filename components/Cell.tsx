import { ChangeEvent, useEffect, useRef, useState } from "react";
import { update } from "../store/selectedCellSlice";
import { cellValues, setCellValue } from "../store/cellValuesSlice";
import { Parser as FormulaParser } from "hot-formula-parser";
import { useAppDispatch, useAppSelector } from "../hooks/store";

interface CellPos {
  index: number;
  label: string;
  isAbsolute: boolean;
}
interface CellCoord {
  label: string;
  row: CellPos;
  column: CellPos;
}

interface Props {
  width: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const [parser] = useState(new FormulaParser());
  const [rawValue, setRawValue] = useState<string>("");
  const [reliesOnCells, setReliesOnCells] = useState<string[]>([]);
  const [calculatedValue, setCalculatedValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const currentCellValues = useAppSelector(cellValues);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = (cellCoord: CellCoord, done: any) => {
      const cellId = `${cellCoord.column.index + 1}${cellCoord.row.index + 1}`;
      const cell = currentCellValues[cellId].rawValue;
      if (reliesOnCells[0] !== cellId) {
        setReliesOnCells([cellId]);
      }
      done(cell);
    };

    parser.on("callCellValue", fn);

    return () => parser.off("callCellValue", fn);
  }, [parser, reliesOnCells, currentCellValues]);

  useEffect(() => {
    if (reliesOnCells.length > 0) {
      const newReliedOnCellValue = currentCellValues[reliesOnCells[0]];
      if (newReliedOnCellValue) {
        const calculated = parser.parse(rawValue.substring(1));
        setCalculatedValue(calculated.error ?? calculated.result);
      }
    }
  }, [reliesOnCells, rawValue, parser, currentCellValues]);

  useEffect(() => {
    if (rawValue.charAt(0) == "=") {
      const calculated = parser.parse(rawValue.substring(1));
      setCalculatedValue(calculated.error ?? calculated.result);
    } else {
      setCalculatedValue(rawValue);
    }
  }, [rawValue, parser]);

  const isHighlighted = (): boolean => {
    return false;
  };

  const onFocus = () => {
    inputRef.current?.focus();
    dispatch(update(`${x}${y}`));
    setIsSelected(true);
  };

  const onBlur = () => {
    setIsSelected(false);
    dispatch(setCellValue({ key: `${x}${y}`, rawValue }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value);
  };

  const onMouseOver = () => {};

  return (
    <>
      <div className="cell" id={`${x}${y}`} onClick={onFocus}>
        <input
          value={isSelected ? rawValue : calculatedValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseOver={onMouseOver}
          onChange={onChange}
          ref={inputRef}
        ></input>
        <div className="dragger"></div>
      </div>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: 30px;
          flex-shrink: 0;
          display: flex;
          border-left: solid 1px rgba(0, 0, 0, 0);
          border-top: solid 1px rgba(0, 0, 0, 0);
          border-right: solid 1px #e2e3e3;
          border-bottom: solid 1px #e2e3e3;
          background: ${isHighlighted() ? "#E8F0FD" : null};
          border: ${isSelected ? "solid 1px blue" : "default"};
        }
        input {
          outline: none;
          border: none;
          width: ${width - 2}px;
          cursor: default;
          background: none;
        }
        .dragger {
          width: 8px;
          height: 8px;
          background: blue;
          position: relative;
          top: 24px;
          left: -5px;
          z-index: 999999;
          flex-shrink: 0;
          display: ${isSelected ? "block" : "none"};
          cursor: grab;
        }
      `}</style>
    </>
  );
};
