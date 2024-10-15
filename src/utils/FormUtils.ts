import { FormField } from "../types";
import * as yup from 'yup';
import { FormSection } from "../types";

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



export const generateValidationSchema = (sections: FormSection[]) => {
  const schema = sections.reduce((schemaAcc, section) => {
    section.rows.forEach((row) => {
      row.forEach((field) => {
        if (field.validations) {
          let validator: yup.AnySchema;

          // Initialize the validator based on the field type
          switch (field.type) {
            case "number":
              validator = yup.number();
              break;
            case "email":
              validator = yup.string().email("Invalid email format");
              break;
            case "date":
              validator = yup.date();
              break;
            case "checkbox":
              validator = yup.boolean();
              break;
            // Add other field types as needed
            default:
              validator = yup.string();
          }

          // Apply each validation rule
          field.validations.forEach((validation) => {
            switch (validation.type) {
              case "required":
                validator = validator.required(validation.message);
                break;
              case "min":
                if (field.type === "number") {
                  validator = (validator as yup.NumberSchema).min(
                    Number(validation.value),
                    validation.message
                  );
                } else if (field.type === "date") {
                  validator = (validator as yup.DateSchema).min(
                    new Date(validation.value),
                    validation.message
                  );
                } else {
                  validator = (validator as yup.StringSchema).min(
                    Number(validation.value),
                    validation.message
                  );
                }
                break;
              case "max":
                if (field.type === "number") {
                  validator = (validator as yup.NumberSchema).max(
                    Number(validation.value),
                    validation.message
                  );
                } else if (field.type === "date") {
                  validator = (validator as yup.DateSchema).max(
                    new Date(validation.value),
                    validation.message
                  );
                } else {
                  validator = (validator as yup.StringSchema).max(
                    Number(validation.value),
                    validation.message
                  );
                }
                break;
              case "email":
                if (field.type !== "email") {
                  validator = (validator as yup.StringSchema).email(validation.message);
                }
                break;
              case "length":
                validator = (validator as yup.StringSchema).length(
                  Number(validation.value),
                  validation.message
                );
                break;
              case "pattern":
                validator = (validator as yup.StringSchema).matches(
                  new RegExp(validation.value),
                  validation.message
                );
                break;
              case "custom":
                try {
                  // Implement custom validation based on any custom logic. 
                  // You can evaluate custom JS expressions here if required
                  const customValidation = new Function('yup', `return yup.${validation.value};`)(yup);
                  validator = validator.concat(customValidation);
                } catch (err) {
                  console.warn(`Invalid custom validation: ${validation.value}`);
                }
                break;
              default:
                break;
            }
          });

          // Assign the constructed validator to the schema
          schemaAcc[field.name] = validator;
        }
      });
    });
    return schemaAcc;
  }, {} as Record<string, yup.AnySchema>);

  return yup.object().shape(schema) as yup.ObjectSchema<any>;
};
