import { ButtonHTMLAttributes, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  reverse?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  isActive,
  reverse = false,
  ...props
}) => {
  const { fontColor, borderColor, mediumColor, darkColor } =
    useContext(ThemeContext);

  const defaultColor = reverse ? darkColor : mediumColor;
  const hoverColor = reverse ? borderColor : darkColor;

  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
          border-radius: 4px;
          border: none;
          background: ${isActive ? hoverColor : defaultColor};
          margin: 4px 2px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: ${fontColor};
          cursor: pointer;
        }
        button:hover {
          background: ${hoverColor};
        }
      `}</style>
    </>
  );
};
