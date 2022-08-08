import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { xAndYToPos } from "../lib/xAndYtoPos";
import {
  selectedCellPosition,
  update,
} from "../store/slices/selectedCellSlice";
import { setMouseDown } from "../store/slices/selectedRangeSlice";

interface SelectedCellContext {
  setInMenu: (inMenu: boolean) => void;
}

export const SelectedCellContext = createContext<SelectedCellContext>({
  setInMenu: () => {},
});

export const SelectedCellProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [inMenu, setInMenu] = useState(false);
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

    const onMouseUp = () => {
      dispatch(setMouseDown(false));
    };

    document.body.addEventListener("keydown", keydownfn);
    document.body.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.removeEventListener("keydown", keydownfn);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [dispatch, cellPos, inMenu]);

  return (
    <SelectedCellContext.Provider
      value={{
        setInMenu,
      }}
    >
      {children}
    </SelectedCellContext.Provider>
  );
};
