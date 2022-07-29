import { useState } from "react";

interface Props {
  width: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ width }) => {
  const [rawValue, setRawValue] = useState<string>("");

  return (
    <>
      <input
        className="cell"
        value={rawValue}
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
