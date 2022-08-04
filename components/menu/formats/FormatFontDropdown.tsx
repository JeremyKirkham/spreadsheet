import { DropdownItem } from "../DropdownItem";
import { FormatDropdown } from "./FormatDropdown";

export const FormatFontDropdown = () => {
  return (
    <>
      <FormatDropdown title="Font" minWidth={180}>
        <DropdownItem>Arial</DropdownItem>
        <DropdownItem>Times New Roman</DropdownItem>
      </FormatDropdown>
    </>
  );
};
