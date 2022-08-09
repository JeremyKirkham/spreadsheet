import { ReactNode, useContext } from "react";
import { IconType } from "react-icons";
import { ThemeContext } from "../../contexts/ThemeContext";

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  isActive?: boolean;
  icon?: IconType;
}

export const DropdownItem: React.FC<Props> = ({
  onClick,
  isActive,
  icon: Icon,
  children,
}) => {
  const { fontColor, highlightedColor } = useContext(ThemeContext);

  return (
    <>
      <span onClick={onClick}>
        {Icon && <Icon className="icon" />}
        {children}
      </span>
      <style jsx>{`
        span {
          cursor: pointer;
          padding: 4px;
          border-radius: 2px;
          color: ${fontColor};
          text-align: left;
          display: flex;
          align-items: center;
          background: ${isActive ? highlightedColor : "none"};
        }
        span:hover {
          background: ${highlightedColor};
        }
        .icon {
          margin-right: 4px;
        }
      `}</style>
    </>
  );
};
