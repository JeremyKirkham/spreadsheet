import { useState } from "react";

interface Props {
  width: number;
  x: number;
  y: number;
}

export const Cell: React.FC<Props> = ({ width }) => {
  return (
    <>
      <input className="cell"></input>
      <style jsx>{`
        .cell {
          width: ${width}px;
          height: 30px;
          flex-shrink: 0;
          border: none;
          border-right: solid 1px #f2f2f2;
          border-bottom: solid 1px #f2f2f2;
        }
        .cell:focus {
          border: solid 1px blue;
        }
      `}</style>
    </>
  );
};