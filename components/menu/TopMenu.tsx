import { BsFileSpreadsheetFill } from "react-icons/bs";
import { Button } from "./Button";

export const TopMenu: React.FC = () => {
  return (
    <>
      <div className="topmenu">
        <div className="icon">
          <BsFileSpreadsheetFill size={24} color="#34A853" />
        </div>
        <Button>File</Button>
        <Button>Edit</Button>
        <Button>View</Button>
        <Button>Insert</Button>
        <Button>Format</Button>
        <Button>Data</Button>
        <Button>Tools</Button>
        <Button>Extensions</Button>
      </div>
      <style jsx>{`
        .topmenu {
          height: 40px;
          width: 100%;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dadce0;
        }
        .icon {
          padding: 0 10px 0 15px;
        }
      `}</style>
    </>
  );
};
