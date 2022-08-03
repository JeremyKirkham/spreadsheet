import { BsFileSpreadsheetFill } from "react-icons/bs";
import { Spacer } from "./Spacer";
import { TaskDataDropdown } from "./tasks/TaskDataDropdown";
import { TaskEditDropdown } from "./tasks/TaskEditDropdown";
import { TaskExtensionsDropdown } from "./tasks/TaskExtensionsDropdown";
import { TaskFileDropdown } from "./tasks/TaskFileDropdown";
import { TaskFormatDropdown } from "./tasks/TaskFormatDropdown";
import { TaskInsertDropdown } from "./tasks/TaskInsertDropdown";
import { TaskToolsDropdown } from "./tasks/TaskToolsDropdown";
import { TaskViewDropdown } from "./tasks/TaskViewDropdown";

export const TopMenu: React.FC = () => {
  return (
    <>
      <div className="topmenu">
        <div className="icon">
          <BsFileSpreadsheetFill size={24} color="#34A853" />
        </div>
        <Spacer />
        <TaskFileDropdown />
        <TaskEditDropdown />
        <TaskViewDropdown />
        <TaskInsertDropdown />
        <TaskFormatDropdown />
        <TaskDataDropdown />
        <TaskToolsDropdown />
        <TaskExtensionsDropdown />
        <Spacer />
      </div>
      <style jsx>{`
        .topmenu {
          height: 40px;
          width: 100%;
          background: #f8f9fa;
          display: flex;
          border-bottom: 1px solid #dadce0;
        }
        .icon {
          width: 58px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};
