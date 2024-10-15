// App.tsx
import React, { useState } from "react";
import * as yup from "yup";
import FormComponent from "./form/FormComponent";
import FormBuilder from "./form-builder/FormBuilder";
import { FormSection } from "./types";
import { generateValidationSchema } from "./utils/FormUtils";

const App: React.FC = () => {
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [fieldsPerPage, setFieldsPerPage] = useState(3);
  const [formSections, setFormSections] = useState<FormSection[]>([]);

  const validationSchema: yup.ObjectSchema<any> = generateValidationSchema(formSections)

  const onSave = (sections: FormSection[]) => {
    setFormSections(sections);
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
          <div className="mb-4">
            <label className="m-5">
              <input
                type="checkbox"
                className="mr-3"
                checked={isMultiStep}
                onChange={() => setIsMultiStep(!isMultiStep)}
              />
              Multistep Form
            </label>
            {isMultiStep && (
              <label className="m-5">
                Fields per page:
                <input
                  type="number"
                  className="ml-3 border p-1"
                  value={fieldsPerPage}
                  onChange={(e) => setFieldsPerPage(Number(e.target.value))}
                  min={1}
                />
              </label>
            )}
          </div>
          <FormComponent
            formSections={formSections}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            isMultiStep={isMultiStep}
            fieldsPerPage={fieldsPerPage}
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
