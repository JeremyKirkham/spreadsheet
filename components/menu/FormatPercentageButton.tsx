import { BsPercent } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { setCellFormat } from "../../store/cellValuesSlice";
import { selectedCell } from "../../store/selectedCellSlice";
import { Button } from "./Button";

export const FormatPercentageButton = () => {
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(
      setCellFormat({
        key: selectedCellValue,
        format: "percentage",
      })
    );
  };

  return (
    <Button onClick={onClick}>
      <BsPercent />
    </Button>
  );
};
