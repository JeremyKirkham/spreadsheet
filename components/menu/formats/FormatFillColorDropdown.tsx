import { BsPaintBucket } from "react-icons/bs";
import { ColorPatch } from "../../ColorPatch";
import { FormatDropdown } from "./FormatDropdown";

export const FormatFillColorDropdown = () => {
  const options = [
    {
      title: "Default",
      value: "none",
      children: (
        <>
          <ColorPatch color="rgba(0,0,0,0)" border={true} />
          Default
        </>
      ),
    },
    {
      title: "Black",
      value: "black",
      children: (
        <>
          <ColorPatch color="#000000" />
          Black
        </>
      ),
    },
    {
      title: "Blue",
      value: "#4285F4",
      children: (
        <>
          <ColorPatch color="#4285F4" />
          Blue
        </>
      ),
    },
    {
      title: "Orange",
      value: "#FBBC04",
      children: (
        <>
          <ColorPatch color="#FBBC04" />
          Orange
        </>
      ),
    },
    {
      title: "Red",
      value: "#D14F5F",
      children: (
        <>
          <ColorPatch color="#D14F5F" />
          Red
        </>
      ),
    },
    {
      title: "Green",
      value: "#34A853",
      children: (
        <>
          <ColorPatch color="#34A853" />
          Green
        </>
      ),
    },
    {
      title: "Purple",
      value: "#5A5AD5",
      children: (
        <>
          <ColorPatch color="#5A5AD5" />
          Purple
        </>
      ),
    },
  ];

  return (
    <FormatDropdown
      icon={BsPaintBucket}
      showCaret={true}
      metaKey="backgroundColor"
      options={options}
      tooltip="Background color"
    />
  );
};
