import { ReactNode } from "react";
import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { cellValues } from "../../../store/cellValuesSlice";
import { selectedCell } from "../../../store/selectedCellSlice";
import { Dropdown } from "../Dropdown";

interface Props {
  title?: string;
  icon?: IconType;
  children?: ReactNode;
  minWidth?: number;
}

export const FormatDropdown: React.FC<Props> = ({
  title,
  icon,
  minWidth,
  children,
}) => {
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  return (
    <Dropdown title={title} icon={icon} minWidth={minWidth}>
      {children}
    </Dropdown>
  );
};
