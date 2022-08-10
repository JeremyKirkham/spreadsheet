import { IconType } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { MetaKeys } from "../../../store/lib/CellValuesState";
import { cellValues, setCellMeta } from "../../../store/slices/cellValuesSlice";
import { selectedCell } from "../../../store/slices/selectedCellSlice";
import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

interface Option {
  title: string;
  value: string | number;
  children?: any;
}

interface Props {
  title?: string;
  icon?: IconType;
  options: Option[];
  metaKey: MetaKeys;
  minWidth?: number;
  showCaret?: boolean;
  tooltip?: string;
}

export const FormatDropdown: React.FC<Props> = ({
  title,
  icon,
  minWidth,
  showCaret,
  options,
  metaKey,
  tooltip,
}) => {
  const currentCellValues = useAppSelector(cellValues);
  const selectedCellValue = useAppSelector(selectedCell);
  const dispatch = useAppDispatch();

  const onClick = (metaValue: string | number) => {
    dispatch(
      setCellMeta({
        key: selectedCellValue,
        metaKey,
        metaValue,
      })
    );
  };

  return (
    <Dropdown
      title={title}
      icon={icon}
      minWidth={minWidth}
      showCaret={showCaret}
      tooltip={tooltip}
      className={metaKey}
    >
      {options.map((opt, i) => {
        return (
          <DropdownItem
            isActive={
              currentCellValues[selectedCellValue]?.meta[metaKey] == opt.value
            }
            onClick={() => {
              onClick(opt.value);
            }}
            key={i}
          >
            {opt.children ?? opt.title}
          </DropdownItem>
        );
      })}
    </Dropdown>
  );
};
