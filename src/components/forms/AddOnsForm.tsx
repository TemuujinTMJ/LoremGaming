import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../Title";

const checklistItems = [
  {
    label: "Online Service",
    description: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    label: "Larger Storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    label: "Customizable Profile",
    description: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
];

type checklistItemsProps = {
  label: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
};

const AddOnsForm = () => {
  const { watch, setValue, getValues } = useFormContext();
  const selectedChecks: checklistItemsProps[] = watch("Add_ons") || [];
  const formData = getValues();

  const handleChange = (item: checklistItemsProps) => {
    const updatedChecks = [...selectedChecks];
    const index = updatedChecks.findIndex(
      (currentItem) => currentItem.label === item.label
    );

    if (index !== -1) {
      updatedChecks.splice(index, 1);
    } else {
      updatedChecks.push(item);
    }

    setValue("Add_ons", updatedChecks);
  };

  const handleCardClick = (item: checklistItemsProps) => {
    handleChange(item);
  };

  return (
    <div className="grid gap-4 md:gap-0">
      <Title
        title={"Pick add-ons"}
        subtitle={"Add-ons help enhance your gaming experience."}
      />
      <div className="space-y-4">
        {checklistItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item)}
            className={`flex items-center border rounded-lg md:p-3 p-2 md:pl-6 pl-4 md:gap-6 gap-4 cursor-pointer ${
              selectedChecks.some(
                (selectedItem) => selectedItem.label === item.label
              )
                ? "bg-active border-active"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="relative flex items-center">
              <input
                id={item.label}
                checked={selectedChecks.some(
                  (selectedItem) => selectedItem.label === item.label
                )}
                className="
        peer relative appearance-none shrink-0 w-5 h-5 border rounded-sm bg-white
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
        checked:bg-activebtn checked:border-0
        disabled:border-steel-400 disabled:bg-steel-400
      "
                type="checkbox"
                //for clean console xD
                onChange={() => handleChange(item)}
              />
              <svg
                className="absolute w-4 h-4 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div>
              <div className="text-primary md:font-medium md:text-base text-sm font-bold">
                {item.label}
              </div>
              <div className="text-secondary md:text-sm text-xs">
                {item.description}
              </div>
            </div>
            <div className="flex-1 text-right text-active md:text-sm text-xs md:font-medium">
              +$
              {formData?.isYearly
                ? item.priceYearly + "/yr"
                : item.priceMonthly + "/mo"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOnsForm;
