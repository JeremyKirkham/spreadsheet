import { BsCurrencyDollar } from "react-icons/bs";
import { FormatButton } from "./FormatButton";

export const FormatCurrencyButton = () => {
  return (
    <FormatButton
      metaKey="format"
      metaValue="currency"
      metaDefaultValue="text"
      icon={BsCurrencyDollar}
    />
  );
};
