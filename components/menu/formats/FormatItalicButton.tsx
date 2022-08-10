import { BsTypeItalic } from "react-icons/bs";
import { FormatButton } from "./FormatButton";

export const FormatItalicButton = () => {
  return (
    <FormatButton
      metaKey="fontStyle"
      metaValue="italic"
      metaDefaultValue="normal"
      icon={BsTypeItalic}
      tooltip="Italic"
    />
  );
};
