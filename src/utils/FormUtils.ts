import * as yup from 'yup';
import { FormSection } from "../types";

export const generateValidationSchema = (sections: FormSection[]) => {
  const schema = sections.reduce((schemaAcc, section) => {
    section.rows.forEach((row) => {
      row.forEach((field) => {
        if (field.validations) {
          let validator: yup.AnySchema;

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
            default:
              validator = yup.string();
          }

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

          schemaAcc[field.name] = validator;
        }
      });
    });
    return schemaAcc;
  }, {} as Record<string, yup.AnySchema>);

  return yup.object().shape(schema) as yup.ObjectSchema<any>;
};
