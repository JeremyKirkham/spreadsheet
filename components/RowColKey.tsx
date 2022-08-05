import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const RowColKey: React.FC<{ height: number }> = ({ height }) => {
  const { fontColor, mediumColor, borderColor } = useContext(ThemeContext);

  return (
    <>
      <div className="cellHeader"></div>
      <style jsx>{`
        .cellHeader {
          text-align: center;
          flex-shrink: 0;
          background: ${mediumColor};
          height: ${height}px;
          line-height: ${height}px;
          border-right: solid 1px ${borderColor};
          border-bottom: solid 1px ${borderColor};
          color: ${fontColor};
          width: 60px;
          position: sticky;
          left: 0;
        }
      `}</style>
    </>
  );
};
