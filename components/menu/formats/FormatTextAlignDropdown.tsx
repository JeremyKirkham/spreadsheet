import { BsJustifyLeft } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextAlignDropdown = () => {
  return (
    <>
      <FormatDropdown icon={BsJustifyLeft}>
        <span>Left</span>
        <span>Center</span>
        <span>Right</span>
      </FormatDropdown>
      <style jsx>{`
        span {
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        span:hover {
          background: #e8f0fd;
        }
      `}</style>
    </>
  );
};
