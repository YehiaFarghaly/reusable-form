import { FormField } from "../types";
import { UseFormTrigger } from "react-hook-form";

export const getCurrentFields = (fields: FormField[], step: number, fieldsPerPage: number) => {
  return fields.slice(step * fieldsPerPage, (step + 1) * fieldsPerPage);
};

export const handleNext = async (
  currentFields: FormField[],
  step: number,
  setStep: (step: number) => void,
  trigger: UseFormTrigger<any>,
  steps: number
) => {
  const isValid = await trigger(currentFields.map((field) => field.name));
  if (isValid && step < steps - 1) {
    setStep(step + 1);
  }
};

export const handleBack = (step: number, setStep: (step: number) => void) => {
  if (step > 0) setStep(step - 1);
};
