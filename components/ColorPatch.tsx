import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ColorPatch: React.FC<{ color: string; border?: boolean }> = ({
  color,
  border = false,
}) => {
  const size = "12px";
  const { borderColor } = useContext(ThemeContext);

  return (
    <>
      <span></span>
      <style jsx>{`
        span {
          background: ${color};
          width: ${size};
          height: ${size};
          border-radius: ${size};
          margin-right: 4px;
          border: solid 1px ${border ? borderColor : color};
        }
      `}</style>
    </>
  );
};
