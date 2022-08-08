import { BsJustifyLeft } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextAlignDropdown = () => {
  const options = [
    {
      title: "Left",
      value: "left",
    },
    {
      title: "Center",
      value: "center",
    },
    {
      title: "Right",
      value: "right",
    },
  ];

  return (
    <FormatDropdown
      icon={BsJustifyLeft}
      showCaret={true}
      metaKey="textAlign"
      options={options}
    />
  );
};
