import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FormatBoldButton } from "./formats/FormatBoldButton";
import { FormatCurrencyButton } from "./formats/FormatCurrencyButton";
import { FormatFillColorButton } from "./formats/FormatFillColorButton";
import { FormatFontDropdown } from "./formats/FormatFontDropdown";
import { FormatItalicButton } from "./formats/FormatItalicButton";
import { FormatPercentageButton } from "./formats/FormatPercentageButton";
import { FormatSizeDropdown } from "./formats/FormatSizeDropdown";
import { FormatStrikethroughButton } from "./formats/FormatStrikethroughButton";
import { FormatTextAlignDropdown } from "./formats/FormatTextAlignDropdown";
import { FormatTextColorButton } from "./formats/FormatTextColorButton";
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
          <FormatSizeDropdown />
          <Spacer />
          <FormatBoldButton />
          <FormatItalicButton />
          <FormatStrikethroughButton />
          <FormatTextColorButton />
          <FormatFillColorButton />
          <Spacer />
          <FormatTextAlignDropdown />
          <FormatTextVerticalAlignDropdown />
          <Spacer />
        </div>
      </div>
      <style jsx>{`
        .actionmenu {
          height: 40px;
          width: 100%;
          background: ${mediumColor};
          display: flex;
          padding-left: 58px;
          border-bottom: 1px solid ${darkColor};
        }
        .format {
          display: flex;
          height: 40px;
        }
      `}</style>
    </>
  );
};
