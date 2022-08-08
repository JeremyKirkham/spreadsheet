import { BsAlignBottom } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextVerticalAlignDropdown = () => {
  const options = [
    {
      title: "Top",
      value: "top",
    },
    {
      title: "Middle",
      value: "middle",
    },
    {
      title: "Bottom",
      value: "bottom",
    },
  ];

  return (
    <FormatDropdown
      icon={BsAlignBottom}
      showCaret={true}
      metaKey="horizontalAlign"
      options={options}
    />
  );
};
