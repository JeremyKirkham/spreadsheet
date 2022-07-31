import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface CellValues {
  [key: string]: {
    rawValue: string;
  };
}

interface CellValuesContext {
  cellValues: CellValues;
  setCellValue: (x: number, y: number, rawValue: string) => void;
}

export const CellValuesContext = createContext<CellValuesContext>({
  cellValues: {},
  setCellValue: () => {},
});

export const CellValuesProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cellValues, setCellValues] = useState<CellValues>({});

  const setCellValue = (x: number, y: number, rawValue: string) => {
    setCellValues((prev) => {
      return {
        ...prev,
        [`${x}${y}`]: {
          rawValue,
        },
      };
    });
  };

  return (
    <CellValuesContext.Provider
      value={{
        cellValues,
        setCellValue,
      }}
    >
      {children}
    </CellValuesContext.Provider>
  );
};
