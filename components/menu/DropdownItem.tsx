import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
}

export const DropdownItem: React.FC<Props> = ({ onClick, children }) => {
  const { fontColor, highlightedColor } = useContext(ThemeContext);

  return (
    <>
      <span onClick={onClick}>{children}</span>
      <style jsx>{`
        span {
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: ${fontColor};
        }
        span:hover {
          background: ${highlightedColor};
        }
      `}</style>
    </>
  );
};
