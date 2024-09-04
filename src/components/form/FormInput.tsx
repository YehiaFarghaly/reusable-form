import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../types";


type FormInputProps = {
  field: FormField;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
};

const FormLabel: React.FC<{ label: string }> = ({ label }) => (
  <label className="block text-sm font-medium text-gray-700">{label}</label>
);

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="text-red-500 text-sm mt-1">{message}</p> : null;

const FormInput: React.FC<FormInputProps> = ({ field, register, error }) => {
  const commonProps = {
    ...register(field.name),
    className: `mt-1 p-2 block w-full sm:text-sm border border-gray-400 rounded-lg`,
  };

  const renderInput = () => {
    switch (field.type) {
      case "select":
      case "multiselect":
        return (
          <select {...commonProps} multiple={field.type === "multiselect"}>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
      case "checkbox":
        return (
          <div className="mt-1">
            {field.options?.map((option, idx) => (
              <label key={idx} className="inline-flex items-center mr-4">
                <input
                  type={field.type}
                  value={option.value}
                  {...register(field.name)}
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className={field.gridLayout || "col-span-12"}>
      <FormLabel label={field.label} />
      {renderInput()}
      <ErrorMessage message={error} />
    </div>
  );
};

export default FormInput;
