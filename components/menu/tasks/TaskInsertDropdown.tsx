import { Dropdown } from "../Dropdown";

export const TaskInsertDropdown = () => {
  return (
    <>
      <Dropdown title="Insert" minWidth={180} showCaret={false}>
        <span>Option 1</span>
        <span>Option 2</span>
      </Dropdown>
      <style jsx>{`
        span {
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
        }
        span:hover {
          background: #e8f0fd;
        }
      `}</style>
    </>
  );
};
