import { ReactNode, useContext, useState } from "react";
import { IconType } from "react-icons";
import { BsCaretDownFill } from "react-icons/bs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Button } from "./Button";

interface Props {
  minWidth?: number;
  title?: string;
  icon?: IconType;
  children?: ReactNode;
  showCaret?: boolean;
}

export const Dropdown: React.FC<Props> = ({
  title,
  icon: Icon,
  minWidth,
  children,
  showCaret = true,
}) => {
  const { boxShadowVar, lightColor, mediumColor } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 10);
    }
  });

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="dropdown-container">
        <Button isActive={open} onClick={onClick}>
          {title}
          {Icon && <Icon />}
          {showCaret && (
            <span className="caret">
              <BsCaretDownFill size={8} />
            </span>
          )}
        </Button>
        <div className="dropdown" ref={ref}>
          {children}
        </div>
      </div>
      <style jsx>{`
        .dropdown-container {
          display: flex;
          position: relative;
        }
        .caret {
          margin-left: 4px;
        }
        .dropdown {
          display: ${open ? "flex" : "none"};
          flex-direction: column;
          width: ${minWidth ? `${minWidth}px` : "default"};
          padding: 4px;
          max-height: 300px;
          overflow-y: auto;
          position: absolute;
          top: 100%;
          left: 2px;
          z-index: 999;
          background: ${lightColor};
          border-radius: 2px;
          box-shadow: var(${boxShadowVar});
          border: solid 1px ${mediumColor};
        }
      `}</style>
    </>
  );
};
