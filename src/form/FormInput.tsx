import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";

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
        return (
          <Select {...commonProps}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        );
      case "radio":
        return (
          <RadioGroup {...commonProps} defaultValue={field.label}>
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "slider":
        return (
          <Slider defaultValue={[33]} max={100} step={1} />
        )
      default:
        return <Input type={field.type} {...commonProps} />;
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
