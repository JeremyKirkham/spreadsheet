import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import {
  cellValues,
  MetaKeys,
  setCellMeta,
} from "../../../store/cellValuesSlice";
import { selectedCell } from "../../../store/selectedCellSlice";
import { Button } from "../Button";

export const FormatButton: React.FC<{
  metaKey: MetaKeys;
  metaValue: any;
  metaDefaultValue: any;
  icon: IconType;
}> = ({ metaKey, metaValue, metaDefaultValue, icon: Icon }) => {
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  const isActive =
    currentCellValues[selectedCellValue]?.meta[metaKey] == metaValue;

  const onClick = () => {
    dispatch(
      setCellMeta({
        key: selectedCellValue,
        metaKey,
        metaValue: isActive ? metaDefaultValue : metaValue,
      })
    );
  };

  return (
    <Button isActive={isActive} onClick={onClick}>
      <Icon />
    </Button>
  );
};
