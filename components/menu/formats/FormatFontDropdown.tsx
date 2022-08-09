import { FormatDropdown } from "./FormatDropdown";

export const FormatFontDropdown = () => {
  const options = [
    {
      title: "Lato",
      value: "Lato",
    },
    {
      title: "Times New Roman",
      value: "Times New Roman",
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
