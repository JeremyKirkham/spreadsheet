import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "./Button";

export const DarkModeButton = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <Button isActive={isDarkMode} onClick={() => setIsDarkMode(!isDarkMode)}>
      DarkMode
    </Button>
  );
};
