import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  isActive?: boolean;
}

export const DropdownItem: React.FC<Props> = ({
  onClick,
  isActive,
  children,
}) => {
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
          background: ${isActive ? highlightedColor : "none"};
        }
        span:hover {
          background: ${highlightedColor};
        }
      `}</style>
    </>
  );
};
