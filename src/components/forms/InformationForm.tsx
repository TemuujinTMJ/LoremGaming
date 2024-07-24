import React from "react";
import { useFormContext } from "react-hook-form";
import Title from "../Title";

const InformationForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const info = [
    {
      name: "name",
      label: "Name",
      placeholder: "e.g. Stephen King",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "e.g. stephenking@lorem.com",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g. +1 234 567 890",
    },
  ];
  return (
    <div className="grid gap-4 md:gap-0">
      <Title
        title={"Personal info"}
        subtitle={"Please provide your name, email address, and phone number."}
      />
      {info.map((item, key) => (
        <div key={key} className="md:mb-6">
          <div className="flex justify-between">
            <label className="block text-sm text-gray-700">{item.label}</label>
            {errors[item.name] && (
              <span className="text-red-600 text-sm font-bold">
                {(errors[item.name] as { message?: string }).message}
              </span>
            )}
          </div>
          <input
            placeholder={item.placeholder}
            {...register(item.name)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-primary"
          />
        </div>
      ))}
    </div>
  );
};

export default InformationForm;
