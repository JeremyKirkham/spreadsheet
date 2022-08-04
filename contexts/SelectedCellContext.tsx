import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPost";
import { selectedCellPosition, update } from "../store/selectedCellSlice";

interface Position {
  x: number;
  y: number;
}

interface SelectedCellContext {
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
  setInMenu: (inMenu: boolean) => void;
}

export const SelectedCellContext = createContext<SelectedCellContext>({
  setHighlightedRange: () => {},
  mousedown: false,
  setInMenu: () => {},
});

export const SelectedCellProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [mousedown, setMousedown] = useState(false);
  const [inMenu, setInMenu] = useState(false);
  const [highlightedStartX, setHighlightedStartX] = useState<number>();
  const [highlightedStartY, setHighlightedStartY] = useState<number>();
  const [highlightedEndX, setHighlightedEndX] = useState<number>();
  const [highlightedEndY, setHighlightedEndY] = useState<number>();
  const cellPos = useAppSelector(selectedCellPosition);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const keydownfn = (event: KeyboardEvent) => {
      if (inMenu) {
        return;
      }

      const existingX = cellPos.x;
      const existingY = cellPos.y;
      let newX = 1;
      let newY = 1;
      if (
        event.key == "ArrowDown" ||
        (!event.shiftKey && event.key == "Enter")
      ) {
        newX = existingX ?? 1;
        newY = existingY ? existingY + 1 : 1;
        document
          .getElementById(xAndYToPos(newX, newY))
          ?.getElementsByTagName("input")[0]
          .focus();
        dispatch(update(xAndYToPos(newX, newY)));
      }
      if (event.key == "ArrowUp" || (event.shiftKey && event.key == "Enter")) {
        newX = existingX ?? 1;
        newY = existingY && existingY > 1 ? existingY - 1 : 1;
        document
          .getElementById(xAndYToPos(newX, newY))
          ?.getElementsByTagName("input")[0]
          .focus();
        dispatch(update(xAndYToPos(newX, newY)));
      }
      if (
        event.key == "ArrowRight" ||
        (!event.shiftKey && event.key == "Tab")
      ) {
        newX = existingX ? existingX + 1 : 1;
        newY = existingY ?? 1;
        document
          .getElementById(xAndYToPos(newX, newY))
          ?.getElementsByTagName("input")[0]
          .focus();
        dispatch(update(xAndYToPos(newX, newY)));
      }
      if (event.key == "ArrowLeft" || (event.shiftKey && event.key == "Tab")) {
        newX = existingX && existingX > 1 ? existingX - 1 : 1;
        newY = existingY ?? 1;
        document
          .getElementById(xAndYToPos(newX, newY))
          ?.getElementsByTagName("input")[0]
          .focus();
        dispatch(update(xAndYToPos(newX, newY)));
      }
    };

    document.body.addEventListener("keydown", keydownfn);

    return () => {
      document.body.removeEventListener("keydown", keydownfn);
    };
  }, [dispatch, cellPos, inMenu]);

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

  const highlightedRange = undefined;

  return (
    <SelectedCellContext.Provider
      value={{
        setHighlightedRange,
        highlightedRange,
        mousedown,
        setInMenu,
      }}
    >
      {children}
    </SelectedCellContext.Provider>
  );
};
