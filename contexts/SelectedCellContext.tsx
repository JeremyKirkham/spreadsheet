import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SelectedCellContext {
  x?: number;
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
  setX: (x?: number) => void;
  setY: (y?: number) => void;
}

export const SelectedCellContext = createContext<SelectedCellContext>({
  setX: () => {},
  setY: () => {},
  setHighlightedRange: () => {},
  mousedown: false,
});

export const SelectedCellProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();
  const [mousedown, setMousedown] = useState(false);
  const [highlightedStartX, setHighlightedStartX] = useState<number>();
  const [highlightedStartY, setHighlightedStartY] = useState<number>();
  const [highlightedEndX, setHighlightedEndX] = useState<number>();
  const [highlightedEndY, setHighlightedEndY] = useState<number>();

  useEffect(() => {
    document.body.onmousedown = () => {
      setMousedown(true);
    };
    document.body.onmouseup = () => {
      setMousedown(false);
    };
    document.body.onkeydown = (event: KeyboardEvent) => {
      if (event.key == "ArrowDown") {
        setY((prev) => (prev ? prev + 1 : undefined));
      }
      if (event.key == "ArrowUp") {
        setY((prev) => (prev ? prev - 1 : undefined));
      }
      if (event.key == "ArrowRight") {
        setX((prev) => (prev ? prev + 1 : undefined));
      }
      if (event.key == "ArrowLeft") {
        setX((prev) => (prev ? prev - 1 : undefined));
      }
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
        setX,
        setY,
        setHighlightedRange,
        highlightedRange,
        mousedown,
      }}
    >
      {children}
    </SelectedCellContext.Provider>
  );
};
