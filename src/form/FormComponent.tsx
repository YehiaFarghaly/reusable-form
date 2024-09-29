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
  fieldsPerPage?: number;
};

const FormComponent: React.FC<FormComponentProps> = ({
  formSections,
  onSubmit,
  validationSchema,
  isMultiStep = false,
  fieldsPerPage = 1,
}) => {
  const { register, control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields", 
  });

  const [currentStep, setCurrentStep] = useState(0);

  const allFields = formSections.flatMap((section) => section.rows.flat());

  const totalSteps = isMultiStep ? Math.ceil(allFields.length / fieldsPerPage) : 1;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startIdx = currentStep * fieldsPerPage;
  const endIdx = startIdx + fieldsPerPage;
  const currentFields = allFields.slice(startIdx, endIdx);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-12 gap-6 bg-white p-6 rounded-lg shadow-lg"
    >
      {isMultiStep ? (
        <>
          {currentFields.map((field) => {
            if (field.isDynamic) {
              return (
                <div key={field.name} className="col-span-12">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-2">
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
              <Button
                text="Next"
                type="button"
                onClick={async () => {
                  const currentFieldsNames = currentFields.map((field) => field.name);
                  const isValid = await trigger(currentFieldsNames);
                  if (isValid) {
                    handleNext();
                  }
                }}
              />
            )}
          </div>
        </>
      ) : (
        formSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="col-span-12">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              {section.sectionName}
            </h2>
            {section.rows.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-12 gap-6 mb-4">
                {row.map((field) => {
                  if (field.isDynamic) {
                    return (
                      <div key={field.name} className="col-span-12">
                        {fields.map((item, index) => (
                          <div key={item.id} className="flex items-center space-x-2">
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
        ))
      )}
    </form>
  );
};

export default FormComponent;
