import { Dropdown } from "../Dropdown";
import { DropdownItem } from "../DropdownItem";

export const TaskEditDropdown = () => {
  return (
    <>
      <Dropdown title="Edit" minWidth={180} showCaret={false}>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </Dropdown>
    </>
  );
};
