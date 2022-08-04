import { FormatDropdown } from "./FormatDropdown";

export const FormatFontDropdown = () => {
  const options = [
    {
      title: "Arial",
      value: "arial",
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
      showCaret={false}
      metaKey="font"
      options={options}
    />
  );
};
