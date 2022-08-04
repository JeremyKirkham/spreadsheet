import { BsPalette } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextColorDropdown = () => {
  const options = [
    {
      title: "Black",
      value: "black",
    },
    {
      title: "Red",
      value: "red",
    },
  ];

  return (
    <FormatDropdown
      icon={BsPalette}
      showCaret={false}
      metaKey="color"
      options={options}
    />
  );
};
