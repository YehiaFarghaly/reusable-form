// OptionEditor.tsx
import React from "react";
import { FormFieldOption } from "../types";

interface OptionEditorProps {
  options: FormFieldOption[];
  onChange: (options: FormFieldOption[]) => void;
}

const OptionEditor: React.FC<OptionEditorProps> = ({ options, onChange }) => {
  const handleOptionChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    onChange(updatedOptions);
  };

  const addOption = () => {
    const newOption: FormFieldOption = { label: "Option", value: "option" };
    onChange([...options, newOption]);
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    onChange(updatedOptions);
  };

  return (
    <div className="mb-2">
      <label className="block text-sm">Options:</label>
      {options.map((option, index) => (
        <div key={index} className="flex items-center mb-1">
          <input
            type="text"
            value={option.label}
            onChange={(e) =>
              handleOptionChange(index, "label", e.target.value)
            }
            placeholder="Label"
            className="border p-1 mr-2 flex-1"
          />
          <input
            type="text"
            value={option.value}
            onChange={(e) =>
              handleOptionChange(index, "value", e.target.value)
            }
            placeholder="Value"
            className="border p-1 mr-2 flex-1"
          />
          <button
            onClick={() => removeOption(index)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addOption} className="text-blue-500 text-sm">
        Add Option
      </button>
    </div>
  );
};

export default OptionEditor;
