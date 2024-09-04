import React from "react";
import * as yup from "yup";
import FormComponent from "./components/form/FormComponent";
import { FormField } from "./types";

const App: React.FC = () => {
  const fields: FormField[] = [
    {
      name: "username",
      type: "text",
      label: "Username",
      gridLayout: "col-span-6"
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      gridLayout: "col-span-6"
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      gridLayout: "col-span-6"
    },
    {
      name: "university",
      type: "text",
      label: "University",
      gridLayout: "col-span-6"
    },
    {
      name: "gender",
      type: "radio",
      label: "Gender",
      options: [{ label: "Male", value: 'male' }, { label: "Female", value: 'female' }],
      gridLayout: "col-span-12"
    }
  ];

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    age: yup.number().required("age is required").min(18),
    email: yup.string().email("format is not valid").required("email is required"),
    university: yup.string().required('university is required'),
    gender: yup.string().required("gender is required"),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return <FormComponent fields={fields} onSubmit={onSubmit} validationSchema={validationSchema} />;
};

export default App;
