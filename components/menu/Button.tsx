import { ButtonHTMLAttributes, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Button: React.FC<Props> = ({ children, isActive, ...props }) => {
  const { fontColor, mediumColor, darkColor } = useContext(ThemeContext);

  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
          border-radius: 4px;
          border: none;
          background: ${isActive ? darkColor : mediumColor};
          margin: 4px 2px;
          min-width: 32px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${fontColor};
        }
        button:hover {
          background: ${darkColor};
        }
      `}</style>
    </>
  );
};
