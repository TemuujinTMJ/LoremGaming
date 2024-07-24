import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../Title";

type checklistItemsProps = {
  label: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
};

const FinishForm = () => {
  const { getValues, setValue } = useFormContext();
  const formData = getValues();

  const handleToggleIsYearly = () => {
    setValue("isYearly", !formData.isYearly);
  };

  const addOnsTotal =
    formData.Add_ons?.reduce(
      (acc: number, item: checklistItemsProps) =>
        acc + (formData.isYearly ? item.priceYearly : item.priceMonthly),
      0
    ) || 0;

  const totalPrice =
    (formData.isYearly
      ? formData.selectedPlan.priceYearly
      : formData.selectedPlan.priceMonthly) + addOnsTotal;

  return (
    <div className="grid gap-4 md:gap-0">
      <Title
        title={"Finishing up"}
        subtitle={"Double-check everything looks OK before confirming."}
      />
      <div className="bg-active p-4 rounded">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-primary font-medium text-sm md:text-base">
              {formData.selectedPlan.plan} (
              {formData.isYearly ? "Yearly" : "Monthly"})
            </div>
            <div className="text-gray-700">
              <button
                type="button"
                className="underline text-secondary text-sm"
                onClick={handleToggleIsYearly}
              >
                Change
              </button>
            </div>
          </div>
          <div className="text-primary font-bold md:text-base text-sm">{`$${
            formData.isYearly
              ? formData.selectedPlan.priceYearly + "/yr"
              : formData.selectedPlan.priceMonthly + "/mo"
          }`}</div>
        </div>
        <div className="border-t border-gray-300 my-4" />
        <div className="grid gap-2">
          {formData.Add_ons.length ? (
            formData.Add_ons.map((item: checklistItemsProps, key: number) => (
              <div key={key} className="flex justify-between">
                <div className="text-secondary text-sm">{item.label}</div>
                <div className="text-primary md:text-xs text-sm">{`+$${
                  formData.isYearly
                    ? item.priceYearly + "/yr"
                    : item.priceMonthly + "/mo"
                }`}</div>
              </div>
            ))
          ) : (
            <div className="text-secondary">
              You haven’t selected any add-ons yet.
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between px-4 md:mt-4">
        <div className="text-secondary text-sm">
          Total (per {formData.isYearly ? "year" : "month"})
        </div>
        <div className="text-active font-bold">{`+$${
          formData.isYearly ? totalPrice + "/yr" : totalPrice + "/mo"
        }`}</div>
      </div>
    </div>
  );
};

export default FinishForm;
