import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Button: React.FC<Props> = ({ children, isActive, ...props }) => {
  return (
    <>
      <button {...props}>{children}</button>
      <style jsx>{`
        button {
          border-radius: 4px;
          border: none;
          background: ${isActive ? "#f1f3f4" : "#f8f9fa"};
          margin: 4px 2px;
          min-width: 32px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        button:hover {
          background: #f1f3f4;
        }
      `}</style>
    </>
  );
};
