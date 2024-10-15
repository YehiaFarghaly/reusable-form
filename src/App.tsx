// App.tsx
import React, { useState } from "react";
import * as yup from "yup";
import FormComponent from "./form/FormComponent";
import FormBuilder from "./form-builder/FormBuilder";
import { FormSection } from "./types";
import { generateValidationSchema } from "./utils/FormUtils";

const App: React.FC = () => {
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [formSections, setFormSections] = useState<FormSection[]>([]);

  const validationSchema: yup.ObjectSchema<any> = generateValidationSchema(formSections);

  const onSave = (sections: FormSection[], multiStep: boolean) => {
    setFormSections(sections);
    setIsMultiStep(multiStep);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container mx-auto p-4">
      {formSections.length === 0 ? (
        <FormBuilder onSave={onSave} />
      ) : (
        <div>
          <FormComponent
            formSections={formSections}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            isMultiStep={isMultiStep}
          />
          <button
            onClick={() => setFormSections([])}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset Form
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
