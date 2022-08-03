import { FormatCurrencyButton } from "./FormatCurrencyButton";
import { FormatPercentageButton } from "./FormatPercentageButton";
import { Spacer } from "./Spacer";

export const ActionMenu: React.FC = () => {
  return (
    <>
      <div className="actionmenu">
        <div className="format">
          <FormatCurrencyButton />
          <FormatPercentageButton />
        </div>
        <Spacer />
      </div>
      <style jsx>{`
        .actionmenu {
          height: 40px;
          width: 100%;
          background: #f8f9fa;
          display: flex;
          padding-left: 60px;
          border-bottom: 1px solid #dadce0;
        }
        .format {
          display: flex;
          height: 40px;
        }
      `}</style>
    </>
  );
};
