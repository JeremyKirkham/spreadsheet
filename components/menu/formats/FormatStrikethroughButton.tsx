import { BsTypeStrikethrough } from "react-icons/bs";
import { FormatButton } from "./FormatButton";

export const FormatStrikethroughButton = () => {
  return (
    <FormatButton
      metaKey="textDecoration"
      metaValue="strikethrough"
      metaDefaultValue="none"
      icon={BsTypeStrikethrough}
    />
  );
};
