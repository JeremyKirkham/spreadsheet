import { FormatDropdown } from "./FormatDropdown";

export const FormatFontSizeDropdown = () => {
  const options = [
    {
      title: "8px",
      value: 8,
    },
    {
      title: "10px",
      value: 10,
    },
    {
      title: "12px",
      value: 12,
    },
    {
      title: "14px",
      value: 14,
    },
    {
      title: "16px",
      value: 16,
    },
    {
      title: "18px",
      value: 18,
    },
  ];

  return (
    <FormatDropdown
      title="Size"
      showCaret={true}
      metaKey="fontSize"
      options={options}
    />
  );
};
