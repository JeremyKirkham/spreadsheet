import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface Position {
  x: string;
  y: number;
}

interface SelectedCellContext {
  x?: string;
  y?: number;
  highlightedRange?: {
    start: Position;
    end: Position;
  };
  setHighlightedRange: ({
    start,
    end,
  }: {
    start?: Position;
    end?: Position;
  }) => void;
  mousedown: boolean;
  rawValue?: string;
  setX: (x?: string) => void;
  setY: (y?: number) => void;
  setRawValue: (rawValue: string) => void;
}

export const SelectedCellContext = createContext<SelectedCellContext>({
  setX: (_x) => {},
  setY: (_x) => {},
  setRawValue: (_x) => {},
  setHighlightedRange: () => {},
  mousedown: false,
});

export const SelectedCellProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [x, setX] = useState<string>();
  const [y, setY] = useState<number>();
  const [rawValue, setRawValue] = useState<string>();
  const [mousedown, setMousedown] = useState(false);
  const [highlightedStartX, setHighlightedStartX] = useState<string>();
  const [highlightedStartY, setHighlightedStartY] = useState<number>();
  const [highlightedEndX, setHighlightedEndX] = useState<string>();
  const [highlightedEndY, setHighlightedEndY] = useState<number>();

  useEffect(() => {
    document.body.onmousedown = () => {
      setMousedown(true);
    };
    document.body.onmouseup = () => {
      setMousedown(false);
    };
  }, []);

  const setHighlightedRange = ({
    start,
    end,
  }: {
    start?: Position;
    end?: Position;
  }) => {
    if (start) {
      setHighlightedStartX(start.x);
      setHighlightedStartY(start.y);
    }
    if (end) {
      setHighlightedEndX(end.x);
      setHighlightedEndY(end.y);
    }
  };

  const highlightedRange =
    highlightedStartX && highlightedStartY && highlightedEndX && highlightedEndY
      ? {
          start: {
            x: highlightedStartX,
            y: highlightedStartY,
          },
          end: {
            x: highlightedEndX,
            y: highlightedEndY,
          },
        }
      : undefined;

  return (
    <SelectedCellContext.Provider
      value={{
        x,
        y,
        rawValue,
        setX,
        setY,
        setRawValue,
        setHighlightedRange,
        highlightedRange,
        mousedown,
      }}
    >
      {children}
    </SelectedCellContext.Provider>
  );
};
