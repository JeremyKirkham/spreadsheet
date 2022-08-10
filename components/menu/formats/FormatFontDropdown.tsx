import { FormatDropdown } from "./FormatDropdown";

export const FormatFontDropdown = () => {
  const options = [
    {
      title: "Lato",
      value: "Lato",
    },
    {
      title: "Roboto",
      value: "Roboto",
    },
  ];

  return (
    <FormatDropdown
      minWidth={180}
      title="Font"
      showCaret={true}
      metaKey="font"
      options={options}
    />
  );
};
