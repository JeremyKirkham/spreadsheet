import { useContext } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

export const SheetMenu: React.FC = () => {
  const selectedCell = useContext(SelectedCellContext);

  return (
    <>
      <div className="secondmenu">
        {selectedCell.x}
        {selectedCell.y}
      </div>
      <style jsx>{`
        .secondmenu {
          height: 30px;
          width: 100%;
          background: #f2f2f2;
          border-bottom: 1px solid #c0c0c0;
        }
      `}</style>
    </>
  );
};
