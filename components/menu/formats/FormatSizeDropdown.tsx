import { DropdownItem } from "../DropdownItem";
import { FormatDropdown } from "./FormatDropdown";

export const FormatSizeDropdown = () => {
  return (
    <>
      <FormatDropdown title="Size" minWidth={60}>
        {Array.from(Array(40).keys()).map((num) => (
          <DropdownItem key={num + 1}>{num + 1}</DropdownItem>
        ))}
      </FormatDropdown>
    </>
  );
};
