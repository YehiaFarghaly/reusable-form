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

  const renderInputField = (validation: FormValidation, index: number) => {
    switch (validation.type) {
      case "min":
      case "max":
      case "length":
        return (
          <input
            type="number"
            value={validation.value || ""}
            onChange={(e) =>
              handleValidationChange(index, "value", e.target.value)
            }
            placeholder="Value"
            className="border p-1 mr-2"
          />
        );
      case "pattern":
        return (
          <input
            type="text"
            value={validation.value || ""}
            onChange={(e) =>
              handleValidationChange(index, "pattern", e.target.value)
            }
            placeholder="Regex Pattern"
            className="border p-1 mr-2"
          />
        );
      case "custom":
        return (
          <input
            type="text"
            value={validation.value || ""}
            onChange={(e) =>
              handleValidationChange(index, "value", e.target.value)
            }
            placeholder="Custom Validation"
            className="border p-1 mr-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-2">
      <label className="block text-sm">Validations:</label>
      {validations.map((validation, index) => (
        <div
          key={index}
          className="flex items-center mb-1 min-w-0 flex-wrap" 
        >
          <select
            value={validation.type}
            onChange={(e) =>
              handleValidationChange(index, "type", e.target.value)
            }
            className="border p-1 mr-2 flex-shrink-0" 
          >
            <option value="required">Required</option>
            <option value="min">Min</option>
            <option value="max">Max</option>
            <option value="email">Email</option>
            <option value="length">Length</option>
            <option value="pattern">Pattern (Regex)</option>
            <option value="custom">Custom</option>
          </select>

          {renderInputField(validation, index)}

          <input
            type="text"
            value={validation.message}
            onChange={(e) =>
              handleValidationChange(index, "message", e.target.value)
            }
            placeholder="Message"
            className="border p-1 mr-2 flex-1 min-w-0" 
          />
          <button
            onClick={() => removeValidation(index)}
            className="text-red-500 flex-shrink-0"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addValidation} className="text-purple-500 text-sm">
        Add Validation
      </button>
    </div>
  );
};

export default ValidationEditor;
