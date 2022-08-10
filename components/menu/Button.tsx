import { ButtonHTMLAttributes, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Tippy from "@tippyjs/react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  reverse?: boolean;
  tooltip?: string;
}

export const Button: React.FC<Props> = ({
  children,
  isActive,
  tooltip,
  reverse = false,
  ...props
}) => {
  const { fontColor, borderColor, mediumColor, darkColor, isDarkMode } =
    useContext(ThemeContext);

  const defaultColor = reverse ? darkColor : mediumColor;
  const hoverColor = reverse ? borderColor : darkColor;

  return (
    <>
      {tooltip ? (
        <Tippy
          content={tooltip}
          theme={!isDarkMode ? "light-border" : "default"}
        >
          <button {...props}>{children}</button>
        </Tippy>
      ) : (
        <button {...props}>{children}</button>
      )}
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
