import { BsJustifyLeft } from "react-icons/bs";
import { DropdownItem } from "../DropdownItem";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextAlignDropdown = () => {
  return (
    <>
      <FormatDropdown icon={BsJustifyLeft}>
        <DropdownItem>Left</DropdownItem>
        <DropdownItem>Center</DropdownItem>
        <DropdownItem>Right</DropdownItem>
      </FormatDropdown>
    </>
  );
};
