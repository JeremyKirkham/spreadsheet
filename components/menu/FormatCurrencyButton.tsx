import { BsCurrencyDollar } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { cellValues, setCellFormat } from "../../store/cellValuesSlice";
import { selectedCell } from "../../store/selectedCellSlice";
import { Button } from "./Button";

export const FormatCurrencyButton = () => {
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(
      setCellFormat({
        key: selectedCellValue,
        format:
          currentCellValues[selectedCellValue]?.format == "currency"
            ? "number"
            : "currency",
      })
    );
  };

  return (
    <Button
      isActive={currentCellValues[selectedCellValue]?.format == "currency"}
      onClick={onClick}
    >
      <BsCurrencyDollar />
    </Button>
  );
};
