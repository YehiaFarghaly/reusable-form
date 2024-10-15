import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { FormSection } from "../types";

type FormComponentProps = {
  formSections: FormSection[];
  onSubmit: SubmitHandler<any>;
  validationSchema: yup.ObjectSchema<any>;
  isMultiStep?: boolean;
};

const FormComponent: React.FC<FormComponentProps> = ({
  formSections,
  onSubmit,
  validationSchema,
  isMultiStep = false,
}) => {
  const { register, control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = isMultiStep ? formSections.length : 1;

  const handleNext = async () => {
    if (isMultiStep) {
      const currentSection = formSections[currentStep];
      const fieldNames = currentSection.rows.flat().map(field => field.name);
      const isValid = await trigger(fieldNames);
      if (isValid) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (isMultiStep && currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-6 bg-white p-6 rounded-lg shadow-lg"
    >
      {isMultiStep ? (
        <>
          <div className="col-span-12">
            <h2 className="text-xl font-semibold mb-4">
              {formSections[currentStep].sectionName}
            </h2>
            {formSections[currentStep].rows.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-12 gap-6 mb-4">
                {row.map((field) => {
                  if (field.isDynamic) {
                    return (
                      <div key={field.name} className="col-span-12">
                        {fields.map((item, index) => (
                          <div key={item.id} className="flex items-center space-x-2 mb-2">
                            <FormInput
                              field={{
                                name: `dynamicFields.${index}.value`,
                                type: field.type,
                                label: `${field.label} ${index + 1}`,
                              }}
                              register={register}
                            />
                            <Button
                              text="Remove"
                              type="button"
                              onClick={() => remove(index)}
                            />
                          </div>
                        ))}
                        <Button
                          text={`Add ${field.label}`}
                          type="button"
                          onClick={() => append({ value: "" })}
                        />
                      </div>
                    );
                  }

                  return (
                    <FormInput
                      key={field.name}
                      field={field}
                      register={register}
                      error={errors[field.name]?.message as string}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="col-span-12 flex justify-between mt-4">
            <Button
              text="Previous"
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
            />
            {currentStep === totalSteps - 1 ? (
              <Button text="Submit" type="submit" />
            ) : (
              <Button text="Next" type="button" onClick={handleNext} />
            )}
          </div>
          <div className="col-span-12 mt-2 text-center text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </>
      ) : (
        <>
          {formSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="col-span-12">
              <h2 className="text-xl font-semibold mb-4">
                {section.sectionName}
              </h2>
              {section.rows.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-12 gap-6 mb-4">
                  {row.map((field) => {
                    if (field.isDynamic) {
                      return (
                        <div key={field.name} className="col-span-12">
                          {fields.map((item, index) => (
                            <div key={item.id} className="flex items-center space-x-2 mb-2">
                              <FormInput
                                field={{
                                  name: `dynamicFields.${index}.value`,
                                  type: field.type,
                                  label: `${field.label} ${index + 1}`,
                                }}
                                register={register}
                              />
                              <Button
                                text="Remove"
                                type="button"
                                onClick={() => remove(index)}
                              />
                            </div>
                          ))}
                          <Button
                            text={`Add ${field.label}`}
                            type="button"
                            onClick={() => append({ value: "" })}
                          />
                        </div>
                      );
                    }

                    return (
                      <FormInput
                        key={field.name}
                        field={field}
                        register={register}
                        error={errors[field.name]?.message as string}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
          <div className="col-span-12 flex justify-end mt-4">
            <Button text="Submit" type="submit" />
          </div>
        </>
      )}
    </form>
  );
};

export default FormComponent;
