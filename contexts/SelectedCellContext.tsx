import { createContext, PropsWithChildren, useState } from "react";

const PWORD_KEY = "pword";

interface SelectedCellContext {
  x: string;
  y: number;
  rawValue?: string;
  setX: (x: string) => void;
  setY: (y: number) => void;
  setRawValue: (rawValue: string) => void;
}

export const SelectedCellContext = createContext<SelectedCellContext>({
  x: "A",
  y: 1,
  setX: (_x) => {},
  setY: (_x) => {},
  setRawValue: (_x) => {},
});

export const SelectedCellProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [x, setX] = useState("A");
  const [y, setY] = useState(1);
  const [rawValue, setRawValue] = useState<string>();

  return (
    <SelectedCellContext.Provider
      value={{ x, y, rawValue, setX, setY, setRawValue }}
    >
      {children}
    </SelectedCellContext.Provider>
  );
};
