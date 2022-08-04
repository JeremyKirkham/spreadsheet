import { BsPaintBucket } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatFillColorDropdown = () => {
  const options = [
    {
      title: "Default",
      value: "none",
    },
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
      icon={BsPaintBucket}
      showCaret={false}
      metaKey="backgroundColor"
      options={options}
    />
  );
};