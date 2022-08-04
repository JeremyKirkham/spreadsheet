import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

export const TaskFileDropdown = () => {
  return (
    <>
      <Dropdown title="File" minWidth={180} showCaret={false}>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </Dropdown>
    </>
  );
};
