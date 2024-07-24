"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InformationForm from "./forms/InformationForm";
import PlanForm from "./forms/PlanForm";
import AddOnsForm from "./forms/AddOnsForm";
import FinishForm from "./forms/FinishForm";
import Sidebar from "./Sidebar";
import Finish from "./Finish";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  selectedPlan: z
    .object({
      plan: z.string(),
      priceMonthly: z.number(),
      priceYearly: z.number(),
    })
    .optional(),
  isYearly: z.boolean().optional(),
  Add_ons: z
    .array(
      z.object({
        label: z.string(),
        priceMonthly: z.number(),
        priceYearly: z.number(),
      })
    )
    .optional(),
});

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  selectedPlan: {
    plan: "Arcade",
    priceMonthly: 9,
    priceYearly: 90,
  },
  isYearly: false,
  Add_ons: [],
};

type FormDataTypes = {
  name: string;
  email: string;
  phone: string;
  selectedPlan: {
    plan: string;
    priceMonthly: number;
    priceYearly: number;
  };
  isYearly: boolean;
  Add_ons: {
    description: string;
    label: string;
    priceMonthly: number;
    priceYearly: number;
  }[];
};

const MultiStepForm: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const formData = methods.watch();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData") || "{}");
    const savedIndex = localStorage.getItem("currentStep");
    if (savedData && Object.keys(savedData).length > 0) {
      methods.reset(savedData);
    } else {
      localStorage.setItem("formData", JSON.stringify(defaultValues));
    }
    if (savedIndex) {
      setIndex(Number(savedIndex));
    }
    setLoading(false);
  }, [methods]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("currentStep", index.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    setLoading(false);

    return () => {
      setLoading(false);

      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData, index]);

  const onSubmit = async (data: FormDataTypes) => {
    const isValid = await methods.trigger(["name", "email", "phone"]);
    if (!isValid) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
      localStorage.setItem("formData", JSON.stringify(data));
    }
  };

  const onStepChange = (step: number) => {
    setIndex(step);
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", step.toString());
  };

  const goBack = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };

  const onFinish = async () => {
    const isValid = await methods.trigger(["name", "email", "phone"]);
    if (!isValid) {
      setIndex(0);
    } else {
      methods.reset(defaultValues);
      localStorage.removeItem("formData");
      localStorage.removeItem("currentStep");
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  if (loading) return null;
  return (
    <FormProvider {...methods}>
      <div className="md:p-4 md:bg-white md:rounded-xl md:shadow-md flex flex-col md:flex-row w-full max-w-[928px]">
        <Sidebar index={index} setIndex={onStepChange} />
        <div className="md:my-4 flex-1 flex justify-center">
          {index === 4 ? (
            <Finish />
          ) : (
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="h-full w-full max-w-100 flex flex-col justify-between mb-20 md:mb-0 mx-4"
            >
              <div className="p-6 md:p-0 md:bg-transparent md:rounded-none md:shadow-none  bg-white rounded-xl shadow-md -mt-18 z-10 md:mt-0 pb-8 md:pb-0">
                {index === 0 && <InformationForm />}
                {index === 1 && <PlanForm />}
                {index === 2 && <AddOnsForm />}
                {index === 3 && <FinishForm />}
              </div>
              <div
                className={`flex bg-white w-full fixed bottom-0 left-0 md:relative p-4 md:p-0 z-20 ${
                  index === 0 ? "justify-end" : "justify-between"
                }`}
              >
                <button
                  type="button"
                  className={`text-secondary p-2 rounded-md end-0 ${
                    index === 0 && "hidden"
                  }`}
                  onClick={goBack}
                >
                  Go Back
                </button>
                <button
                  type={index !== 3 ? "submit" : "button"}
                  className={`text-white p-2 rounded-md w-28 ${
                    index === 3 ? "bg-activebtn" : "bg-primary"
                  }`}
                  onClick={onFinish}
                >
                  {index === 3 ? "Confirm" : "Next Step"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default MultiStepForm;
