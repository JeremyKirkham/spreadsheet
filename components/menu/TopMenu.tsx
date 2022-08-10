import { useContext } from "react";
import { BsFileSpreadsheetFill } from "react-icons/bs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DarkModeButton } from "./DarkModeButton";
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
  const { mediumColor, darkColor } = useContext(ThemeContext);

  return (
    <>
      <div className="topmenu">
        <div className="icon">
          <BsFileSpreadsheetFill size={24} color="#34A853" />
        </div>
        <div className="scrollable">
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
          <DarkModeButton />
          <Spacer />
        </div>
      </div>
      <style jsx>{`
        .topmenu {
          min-height: 40px;
          width: 100%;
          background: ${mediumColor};
          display: flex;
          border-bottom: 1px solid ${darkColor};
        }
        .scrollable {
          display: flex;
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
