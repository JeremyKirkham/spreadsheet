import { createContext, PropsWithChildren, useState } from "react";

interface ThemeContext {
  fontColor: string;
  fontPlaceholderColor: string;
  lightColor: string;
  mediumColor: string;
  darkColor: string;
  borderColor: string;
  highlightedColor: string;
  selectedColor: string;
  setIsDarkMode: (darkMode: boolean) => void;
  isDarkMode: boolean;
  boxShadowVar: string;
}

export const ThemeContext = createContext<ThemeContext>({
  fontColor: "#000000",
  fontPlaceholderColor: "#000000",
  lightColor: "#FFFFFF",
  mediumColor: "#F8F9FA",
  darkColor: "#E8EAED",
  borderColor: "c0c0c0",
  highlightedColor: "#e8f0fd",
  selectedColor: "#1A73E8",
  setIsDarkMode: () => {},
  isDarkMode: false,
  boxShadowVar: "--shadow-elevation-medium",
});

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fontColor = isDarkMode ? "#f2f2f2" : "#000000";
  const fontPlaceholderColor = isDarkMode ? "#9C9E9F" : "default";
  const lightColor = isDarkMode ? "#3D434B" : "#FFFFFF";
  const mediumColor = isDarkMode ? "#2D3136" : "#F8F9FA";
  const darkColor = isDarkMode ? "#212529" : "#E8EAED";
  const borderColor = isDarkMode ? "#000000" : "#c0c0c0";
  const highlightedColor = isDarkMode ? "#212529" : "#e8f0fd";
  const selectedColor = "#1A73E8";
  const boxShadowVar = isDarkMode
    ? "--shadow-elevation-medium-dark"
    : "--shadow-elevation-medium";

  return (
    <ThemeContext.Provider
      value={{
        fontColor,
        fontPlaceholderColor,
        lightColor,
        mediumColor,
        darkColor,
        borderColor,
        highlightedColor,
        selectedColor,
        boxShadowVar,
        setIsDarkMode,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
