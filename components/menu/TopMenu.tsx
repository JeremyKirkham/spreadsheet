import { FormatCurrencyButton } from "./FormatCurrencyButton";
import { FormatPercentageButton } from "./FormatPercentageButton";

export const TopMenu: React.FC = () => {
  return (
    <>
      <div className="topmenu">
        <div className="format">
          <FormatCurrencyButton />
          <FormatPercentageButton />
        </div>
      </div>
      <style jsx>{`
        .topmenu {
          height: 40px;
          width: 100%;
          background: #f8f9fa;
        }
        .format {
          display: flex;
          height: 40px;
        }
      `}</style>
    </>
  );
};
