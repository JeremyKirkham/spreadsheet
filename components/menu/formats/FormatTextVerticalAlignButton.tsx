import { BsAlignBottom } from "react-icons/bs";
import { FormatDropdown } from "./FormatDropdown";

export const FormatTextVerticalAlignDropdown = () => {
  return (
    <>
      <FormatDropdown icon={BsAlignBottom}>
        <span>Top</span>
        <span>Middle</span>
        <span>Bottom</span>
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
