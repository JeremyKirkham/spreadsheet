import { useContext, useState } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

interface Props {
  width: number;
  x: string;
  y: number;
}

export const Cell: React.FC<Props> = ({ x, y, width }) => {
  const selectedCell = useContext(SelectedCellContext);
  const [rawValue, setRawValue] = useState<string>("");

  const onSelect = () => {
    selectedCell.setX(x);
    selectedCell.setY(y);
  };

  return (
    <>
      <input
        className="cell"
        value={rawValue}
        onFocus={onSelect}
        onChange={(e) => setRawValue(e.target.value)}
      ></input>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: 30px;
          flex-shrink: 0;
          border: none;
          border-left: solid 1px white;
          border-top: solid 1px white;
          border-right: solid 1px #f2f2f2;
          border-bottom: solid 1px #f2f2f2;
          outline: none;
        }
        .cell:focus {
          border: solid 1px blue;
        }
      `}</style>
    </>
  );
};
