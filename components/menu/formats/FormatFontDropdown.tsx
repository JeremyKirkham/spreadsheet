import { FormatDropdown } from "./FormatDropdown";

export const FormatFontDropdown = () => {
  return (
    <>
      <FormatDropdown title="Font" minWidth={180}>
        <span>Arial</span>
        <span>Times New Roman</span>
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
