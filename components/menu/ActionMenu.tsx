import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FormatBoldButton } from "./formats/FormatBoldButton";
import { FormatCurrencyButton } from "./formats/FormatCurrencyButton";
import { FormatFillColorDropdown } from "./formats/FormatFillColorDropdown";
import { FormatFontDropdown } from "./formats/FormatFontDropdown";
import { FormatItalicButton } from "./formats/FormatItalicButton";
import { FormatPercentageButton } from "./formats/FormatPercentageButton";
import { FormatFontSizeDropdown } from "./formats/FormatFontSizeDropdown";
import { FormatStrikethroughButton } from "./formats/FormatStrikethroughButton";
import { FormatTextAlignDropdown } from "./formats/FormatTextAlignDropdown";
import { FormatTextColorDropdown } from "./formats/FormatTextColorDropdown";
import { FormatTextVerticalAlignDropdown } from "./formats/FormatTextVerticalAlignDropdown";
import { Spacer } from "./Spacer";

export const ActionMenu: React.FC = () => {
  const { mediumColor, darkColor } = useContext(ThemeContext);

  return (
    <>
      <div className="actionmenu">
        <div className="format">
          <Spacer />
          <FormatCurrencyButton />
          <FormatPercentageButton />
          <Spacer />
          <FormatFontDropdown />
          <Spacer />
          <FormatFontSizeDropdown />
          <Spacer />
          <FormatBoldButton />
          <FormatItalicButton />
          <FormatStrikethroughButton />
          <FormatTextColorDropdown />
          <FormatFillColorDropdown />
          <Spacer />
          <FormatTextAlignDropdown />
          <FormatTextVerticalAlignDropdown />
          <Spacer />
        </div>
      </div>
      <style jsx>{`
        .actionmenu {
          width: 100%;
          background: ${mediumColor};
          display: flex;
          padding-left: 58px;
          border-bottom: 1px solid ${darkColor};
          overflow-x: auto;
        }
        .format {
          display: flex;
          height: 40px;
        }
      `}</style>
    </>
  );
};
