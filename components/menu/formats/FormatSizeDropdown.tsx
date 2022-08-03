import { FormatDropdown } from "./FormatDropdown";

export const FormatSizeDropdown = () => {
  return (
    <>
      <FormatDropdown title="Size" minWidth={60}>
        <span>8</span>
        <span>9</span>
        <span>10</span>
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
