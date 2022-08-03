import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  CellFormat,
  cellValues,
  setCellFormat,
} from "../../store/cellValuesSlice";
import { selectedCell } from "../../store/selectedCellSlice";
import { Button } from "./Button";

export const FormatButton: React.FC<{ format: CellFormat; icon: IconType }> = ({
  format,
  icon: Icon,
}) => {
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  const isActive = currentCellValues[selectedCellValue]?.format == format;

  const onClick = () => {
    dispatch(
      setCellFormat({
        key: selectedCellValue,
        format: isActive ? "text" : format,
      })
    );
  };

  return (
    <Button isActive={isActive} onClick={onClick}>
      <Icon />
    </Button>
  );
};
