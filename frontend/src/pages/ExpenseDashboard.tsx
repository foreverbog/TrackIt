import { useState } from "react";
import ExpensesHeading from "../components/ExpensesHeading";
import ExpensesGrid from "../components/ExpensesGrid";
import { useTranslation } from "react-i18next";

const ExpenseDashboard = () => {
  const [t] = useTranslation("global");
  // console.log(expenses);
  const [activeExpenseType, setActiveExpenseType] = useState<string | "Daily">(
    "Daily"
  );

  const handleExpenseTypesSelect = (type: string) => {
    setActiveExpenseType(type);
  };

  return (
    <div className="bg-base   font-base text-base-text min-h-dvh flex flex-col">
      <h1 className="text-4xl py-6 pl-6 bg-primary text-primary-text">
        {t("menu.expense")}
      </h1>
      <ExpensesHeading
        activeExpenseType={activeExpenseType}
        handleExpenseTypesSelect={handleExpenseTypesSelect}
      />

      <ExpensesGrid />
    </div>
  );
};

export default ExpenseDashboard;
