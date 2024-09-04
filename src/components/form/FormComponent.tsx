import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { FormField } from "../../types";
import { FIELDS_NUMBER_PER_PAGE } from "../../constants";
import { getCurrentFields, handleNext, handleBack } from "../../utils/FormUtils";

type FormComponentProps = {
  fields: FormField[];
  onSubmit: SubmitHandler<any>;
  validationSchema: yup.ObjectSchema<any>;
};

const FormComponent: React.FC<FormComponentProps> = ({
  fields,
  onSubmit,
  validationSchema,
}) => {
  const [step, setStep] = useState(0);
  const steps = Math.ceil(fields.length / FIELDS_NUMBER_PER_PAGE);
  const isLastStep = step === steps - 1;
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const currentFields = getCurrentFields(fields, step, FIELDS_NUMBER_PER_PAGE);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-6 bg-white p-6 rounded-lg shadow-lg"
    >
      {currentFields.map((field) => (
        <FormInput
          key={field.name}
          field={field}
          register={register}
          error={errors[field.name]?.message as string}
        />
      ))}
      <div className="col-span-12 flex justify-between">
        {step > 0 && <Button text="Back" type="button" onClick={() => handleBack(step, setStep)} />}
        <Button
          text={isLastStep ? "Submit" : "Next"}
          type={isLastStep ? "submit" : "button"}
          onClick={() => !isLastStep && handleNext(currentFields, step, setStep, trigger, steps)}
        />
      </div>
    </form>
  );
};

export default FormComponent;
