import { BsPercent } from "react-icons/bs";
import { FormatButton } from "./FormatButton";

export const FormatPercentageButton = () => {
  return (
    <FormatButton
      metaKey="format"
      metaValue="percentage"
      metaDefaultValue="text"
      icon={BsPercent}
      tooltip="Format as percentage"
    />
  );
};
