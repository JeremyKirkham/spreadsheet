import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Spacer = () => {
  const { darkColor } = useContext(ThemeContext);

  return (
    <>
      <div className="menu-spacer"></div>
      <style jsx>{`
        .menu-spacer {
          border-right: 1px solid ${darkColor};
          margin: 10px 2px;
          display: flex;
        }
      `}</style>
    </>
  );
};
