import React, { useState } from "react";
import * as yup from "yup";
import FormComponent from "./form/FormComponent";
import { FormSection } from "./types";

const App: React.FC = () => {
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [fieldsPerPage, setFieldsPerPage] = useState(3);

  const formSections: FormSection[] = [
    {
      sectionName: "Personal Information",
      rows: [
        [
          {
            name: "username",
            type: "text",
            label: "Username",
            gridLayout: "col-span-6",
            validation: yup.string().required("username is required"),
          },
          {
            name: "age",
            type: "number",
            label: "Age",
            gridLayout: "col-span-6",
            validation: yup.number().required("age is required").min(18, "Age must be at least 18"),
          },
        ],
        [
          {
            name: "email",
            type: "text",
            label: "Email",
            gridLayout: "col-span-6",
            validation: yup.string().email("format is not valid").required("email is required"),
          },
          {
            name: "university",
            type: "text",
            label: "University",
            gridLayout: "col-span-6",
            validation: yup.string().required("university is required"),
          },
        ],
      ],
    },
    {
      sectionName: "Additional Information",
      rows: [
        [
          {
            name: "gender",
            type: "radio",
            label: "Gender",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ],
            gridLayout: "col-span-12",
            validation: yup.string().required("gender is required"),
          },
        ],
      ],
    },
    {
      sectionName: "Phone Numbers",
      rows: [
        [
          {
            name: "phoneNumbers",
            type: "text",
            label: "Phone Number",
            gridLayout: "col-span-12",
            isDynamic: true,
            validation: yup.array().of(
              yup.string().matches(
                /^[0-9]{10}$/,
                "Phone number must be exactly 10 digits"
              ).required("Phone number is required")
            ),
          },
        ],
      ],
    },
  ];

  const validationSchema = yup.object().shape(
    formSections.reduce((schema, section) => {
      section.rows.forEach((row) => {
        row.forEach((field) => {
          if (field.validation) {
            schema[field.name] = field.validation;
          }
        });
      });
      return schema;
    }, {} as Record<string, yup.AnySchema>)
  );

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
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
        <div>
          <label className="m-5">
            Fields per page:
            <input
              type="number"
              className="ml-3"
              value={fieldsPerPage}
              onChange={(e) => setFieldsPerPage(Number(e.target.value))}
              min={1}
            />
          </label>
        </div>
      )}

      <FormComponent
        formSections={formSections}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        isMultiStep={isMultiStep}
        fieldsPerPage={fieldsPerPage}
      />
    </div>
  );
};

export default App;
