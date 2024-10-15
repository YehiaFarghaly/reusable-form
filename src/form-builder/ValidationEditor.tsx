// ValidationEditor.tsx
import React from "react";
import { FormValidation } from "../types";

interface ValidationEditorProps {
  validations: FormValidation[];
  onChange: (validations: FormValidation[]) => void;
}

const ValidationEditor: React.FC<ValidationEditorProps> = ({
  validations,
  onChange,
}) => {
  const handleValidationChange = (
    index: number,
    key: string,
    value: any
  ) => {
    const updatedValidations = [...validations];
    updatedValidations[index] = {
      ...updatedValidations[index],
      [key]: value,
    };
    onChange(updatedValidations);
  };

  const addValidation = () => {
    const newValidation: FormValidation = {
      type: "required",
      message: "This field is required",
    };
    onChange([...validations, newValidation]);
  };

  const removeValidation = (index: number) => {
    const updatedValidations = [...validations];
    updatedValidations.splice(index, 1);
    onChange(updatedValidations);
  };

  return (
    <div className="mb-2">
      <label className="block text-sm">Validations:</label>
      {validations.map((validation, index) => (
        <div key={index} className="flex items-center mb-1">
          <select
            value={validation.type}
            onChange={(e) =>
              handleValidationChange(index, "type", e.target.value)
            }
            className="border p-1 mr-2"
          >
            <option value="required">Required</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
            <option value="email">Email</option>
          </select>
          {["min", "max"].includes(validation.type) && (
            <input
              type="text"
              value={validation.value || ""}
              onChange={(e) =>
                handleValidationChange(index, "value", e.target.value)
              }
              placeholder="Value"
              className="border p-1 mr-2"
            />
          )}
          <input
            type="text"
            value={validation.message}
            onChange={(e) =>
              handleValidationChange(index, "message", e.target.value)
            }
            placeholder="Message"
            className="border p-1 mr-2 flex-1"
          />
          <button
            onClick={() => removeValidation(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addValidation} className="text-blue-500 text-sm">
        Add Validation
      </button>
    </div>
  );
};

export default ValidationEditor;
