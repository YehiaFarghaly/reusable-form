import { FormField } from "../types";

export const getCurrentFields = (fields: FormField[], step: number, fieldsPerPage: number) => {
  return fields.slice(step * fieldsPerPage, (step + 1) * fieldsPerPage);
};

export const handleNext = async (
  step: number,
  setStep: (step: number) => void,
  steps: number
) => {
  if ( step < steps - 1) {
    setStep(step + 1);
  }
};

export const handleBack = (step: number, setStep: (step: number) => void) => {
  if (step > 0) setStep(step - 1);
};
