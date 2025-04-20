import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput";
import Button from "./FormButton";
import { FormSection } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";

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
  const progress = isMultiStep ? ((currentStep + 1) / totalSteps) * 100 : 100;

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
    <Card className="w-full shadow-md animate-fade-in">
      {isMultiStep && (
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{formSections[currentStep].sectionName}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        {isMultiStep ? (
          <div>
            <CardHeader>
              <CardTitle>{formSections[currentStep].sectionName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formSections[currentStep].rows.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-12 gap-6">
                    {row.map((field) => {
                      if (field.isDynamic) {
                        return (
                          <div key={field.name} className={field.gridLayout || "col-span-12"}>
                            {fields.map((item, index) => (
                              <div key={item.id} className="flex items-center space-x-2 mb-3">
                                <div className="flex-1">
                                  <FormInput
                                    field={{
                                      name: `dynamicFields.${index}.value`,
                                      type: field.type,
                                      label: `${field.label} ${index + 1}`,
                                    }}
                                    register={register}
                                  />
                                </div>
                                <Button
                                  text="Remove"
                                  type="button"
                                  onClick={() => remove(index)}
                                  variant="destructive"
                                  size="sm"
                                />
                              </div>
                            ))}
                            <Button
                              text={`Add ${field.label}`}
                              type="button"
                              onClick={() => append({ value: "" })}
                              variant="secondary"
                              size="sm"
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
                <div className="flex justify-between mt-6">
                  <Button
                    text="Previous"
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    variant="outline"
                  />
                  {currentStep === totalSteps - 1 ? (
                    <Button text="Submit" type="submit" variant="default" />
                  ) : (
                    <Button text="Next" type="button" onClick={handleNext} variant="default" />
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        ) : (
          <CardContent className="pt-6">
            <div className="space-y-8">
              {formSections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.sectionName}
                  </h2>
                  {section.rows.map((row, rowIdx) => (
                    <div key={rowIdx} className="grid grid-cols-12 gap-6">
                      {row.map((field) => {
                        if (field.isDynamic) {
                          return (
                            <div key={field.name} className={field.gridLayout || "col-span-12"}>
                              {fields.map((item, index) => (
                                <div key={item.id} className="flex items-center space-x-2 mb-3">
                                  <div className="flex-1">
                                    <FormInput
                                      field={{
                                        name: `dynamicFields.${index}.value`,
                                        type: field.type,
                                        label: `${field.label} ${index + 1}`,
                                      }}
                                      register={register}
                                    />
                                  </div>
                                  <Button
                                    text="Remove"
                                    type="button"
                                    onClick={() => remove(index)}
                                    variant="destructive"
                                    size="sm"
                                  />
                                </div>
                              ))}
                              <Button
                                text={`Add ${field.label}`}
                                type="button"
                                onClick={() => append({ value: "" })}
                                variant="secondary"
                                size="sm"
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
              <div className="flex justify-end mt-6">
                <Button text="Submit" type="submit" variant="default" />
              </div>
            </div>
          </CardContent>
        )}
      </form>
    </Card>
  );
};

export default FormComponent;