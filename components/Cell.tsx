import { ChangeEvent, useEffect, useRef, useState } from "react";
import { update } from "../store/selectedCellSlice";
import { CellValue, cellValues, setCellValue } from "../store/cellValuesSlice";
import { Parser as FormulaParser } from "hot-formula-parser";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPost";

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
  const [localValue, setLocalValue] = useState<CellValue>({
    rawValue: "",
    calculatedValue: "",
  });
  const [reliesOnCells, setReliesOnCells] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const currentCellValues = useAppSelector(cellValues);
  const inputRef = useRef<HTMLInputElement>(null);

  const pos = xAndYToPos(x, y);

  useEffect(() => {
    const fn = (cellCoord: CellCoord, done: any) => {
      const cellId = xAndYToPos(
        cellCoord.column.index + 1,
        cellCoord.row.index + 1
      );
      const cell = currentCellValues[cellId].calculatedValue;
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
        const calculated = parser.parse(localValue.rawValue.substring(1));
        let calc = calculated.error ?? calculated.result;
        if (localValue.calculatedValue !== calc) {
          setLocalValue({
            rawValue: localValue.rawValue,
            calculatedValue: calc,
          });
          setTimeout(() => {
            dispatch(
              setCellValue({
                key: pos,
                rawValue: localValue.rawValue,
                calculatedValue: calc,
              })
            );
          }, 10);
        }
      }
    }
  }, [reliesOnCells, localValue, parser, currentCellValues, dispatch, pos]);

  const isHighlighted = (): boolean => {
    return false;
  };

  const onFocus = () => {
    inputRef.current?.focus();
    dispatch(update(pos));
    setIsSelected(true);
  };

  const onBlur = () => {
    setIsSelected(false);
    let calculatedValue = localValue.rawValue;
    if (localValue.rawValue.charAt(0) == "=") {
      const calculated = parser.parse(localValue.rawValue.substring(1));
      calculatedValue = calculated.error ?? calculated.result;
    }
    setLocalValue({
      rawValue: localValue.rawValue,
      calculatedValue,
    });
    dispatch(
      setCellValue({
        key: pos,
        rawValue: localValue.rawValue,
        calculatedValue,
      })
    );
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue({ rawValue: e.target.value });
  };

  const onMouseOver = () => {};

  return (
    <>
      <div className="cell" id={pos} onClick={onFocus}>
        <input
          value={
            isSelected ? localValue.rawValue : localValue.calculatedValue ?? ""
          }
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
