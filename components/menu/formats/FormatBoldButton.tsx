import { BsTypeBold } from "react-icons/bs";
import { FormatButton } from "./FormatButton";

export const FormatBoldButton = () => {
  return (
    <FormatButton
      metaKey="fontWeight"
      metaValue="bold"
      metaDefaultValue="normal"
      icon={BsTypeBold}
    />
  );
};
