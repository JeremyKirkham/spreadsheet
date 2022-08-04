import { BsAlignBottom } from "react-icons/bs";
import { DropdownItem } from "../DropdownItem";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextVerticalAlignDropdown = () => {
  return (
    <>
      <FormatDropdown icon={BsAlignBottom}>
        <DropdownItem>Top</DropdownItem>
        <DropdownItem>Middle</DropdownItem>
        <DropdownItem>Bottom</DropdownItem>
      </FormatDropdown>
    </>
  );
};
