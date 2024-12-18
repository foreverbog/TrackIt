import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";
import MenuTitleComponent from "../components/Navigation/MenuTitleComponent";
import { BsCurrencyExchange } from "react-icons/bs";
import ExchangeContainer from "../components/ExchangeRates/ExchangeContainer";

const ExchangeRates = () => {
  const { t } = useTranslation("global");
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();
  return (
    <div className="relative min-h-dvh overflow-hidden bg-base ">
      <MenuTitleComponent
        title={t("exchange.title")}
        setIsMenuOpen={setIsMenuOpen}
      />
      <ExchangeContainer />
      {/* //*BOTTOM RIGHT SVG */}
      <BsCurrencyExchange className="absolute -bottom-12 -right-12 2 text-[240px] md:text-[440px] opacity-20 text-base-text" />
    </div>
  );
};

export default ExchangeRates;
