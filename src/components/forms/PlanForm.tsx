import React from "react";
import { useFormContext } from "react-hook-form";
import IconAdvanced from "../../../assets/images/icon-advanced.svg";
import IconArcade from "../../../assets/images/icon-arcade.svg";
import IconPro from "../../../assets/images/icon-pro.svg";
import Title from "../Title";

const cardOptions = [
  { plan: "Arcade", priceMonthly: 9, priceYearly: 90, icon: <IconArcade /> },
  {
    plan: "Advanced",
    priceMonthly: 12,
    priceYearly: 120,
    icon: <IconAdvanced />,
  },
  { plan: "Pro", priceMonthly: 15, priceYearly: 150, icon: <IconPro /> },
];

interface OptionTypes {
  plan: string;
  priceMonthly: number;
  priceYearly: number;
  icon: React.ReactElement;
}

const Step2 = () => {
  const { register, watch, setValue, getValues } = useFormContext();
  const selectedPlan = watch("selectedPlan") || {};
  const formData = getValues();

  const handlePlanSelect = (option: OptionTypes) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { icon, ...plan } = option;
    setValue("selectedPlan", plan);
  };

  const handleToggle = () => {
    setValue("isYearly", !formData.isYearly);
  };

  return (
    <div className="grid gap-4 md:gap-0">
      <Title
        title={"Select your plan"}
        subtitle={"You have the option of monthly or yearly billing."}
      />
      <div className="flex gap-4 flex-col md:flex-row">
        {cardOptions.map((option) => (
          <div
            key={option.plan}
            className={`border p-4 rounded-lg cursor-pointer w-full md:gap-8 gap-3 md:grid flex ${
              selectedPlan.plan === option.plan
                ? "bg-active border-active"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handlePlanSelect(option)}
          >
            {option.icon}
            <div>
              <div className="text-primary font-medium text-sm">
                {option.plan}
              </div>
              <div className="text-secondary text-xs">{`${
                formData.isYearly
                  ? "$" + option.priceYearly + "/yr"
                  : "$" + option.priceMonthly + "/mo"
              }`}</div>
              <div className="text-primary text-xxs">
                {formData.isYearly && "2 months free"}
              </div>
            </div>
          </div>
        ))}
      </div>
      <label className="inline-flex items-center cursor-pointer md:mt-8 bg-active p-2 rounded w-full justify-center gap-5">
        <span
          className={`px-4 py-2 rounded-l-md font-medium text-sm ${
            !formData.isYearly ? "text-primary" : "text-secondary"
          }`}
        >
          Monthly
        </span>
        <input
          {...register("isYearly")}
          type="checkbox"
          className="sr-only peer"
          onChange={handleToggle}
        />
        <div className="relative w-11 h-[22px] bg-white dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:mt-[2px] after:ml-[4px] after:transition-all  peer-checked:bg-primary" />
        <span
          className={`px-4 py-2 rounded-r-md font-medium text-sm ${
            formData.isYearly ? "text-primary" : "text-secondary"
          }`}
        >
          Yearly
        </span>
      </label>
    </div>
  );
};

export default Step2;
