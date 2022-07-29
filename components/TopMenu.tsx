import { useContext } from "react";
import { SelectedCellContext } from "../contexts/SelectedCellContext";

export const TopMenu: React.FC = () => {
  const selectedCell = useContext(SelectedCellContext);

  return (
    <>
      <div className="topmenu"></div>
      <div className="secondmenu">
        {selectedCell.x}
        {selectedCell.y}
      </div>
      <style jsx>{`
        .topmenu {
          height: 40px;
          width: 100%;
          background: grey;
        }
        .secondmenu {
          height: 40px;
          width: 100%;
          background: #f2f2f2;
          border-bottom: 1px solid #c0c0c0;
        }
      `}</style>
    </>
  );
};
