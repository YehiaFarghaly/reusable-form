// FormBuilder.tsx
import React, { useState } from "react";
import { FormSection, FormField, FormValidation, FormFieldOption } from "../types";

const fieldTypes = [
  "text",
  "number",
  "email",
  "select",
  "slider",
  "checkbox",
  "radio",
  'file',
  'date'
];
let ctr:number = 1;
const FormBuilder: React.FC<{
  onSave: (formSections: FormSection[]) => void;
}> = ({ onSave }) => {
  const [formSections, setFormSections] = useState<FormSection[]>([]);

  const addSection = () => {
    const newSection: FormSection = {
      sectionName: `Section ${formSections.length + 1}`,
      rows: [[]],
    };
    setFormSections([...formSections, newSection]);
  };

  const updateSectionName = (index: number, name: string) => {
    const updatedSections = [...formSections];
    updatedSections[index].sectionName = name;
    setFormSections(updatedSections);
  };

  const addField = (sectionIndex: number, rowIndex: number) => {
    const newField: FormField = {
      name: `field_${ctr++}`,
      label: "New Field",
      type: "text",
      gridLayout: "col-span-6",
      validations: [],
    };
    const updatedSections = [...formSections];
    updatedSections[sectionIndex].rows[rowIndex].push(newField);
    setFormSections(updatedSections);
  };

  const updateField = (
    sectionIndex: number,
    rowIndex: number,
    fieldIndex: number,
    updatedField: FormField
  ) => {
    const updatedSections = [...formSections];
    updatedSections[sectionIndex].rows[rowIndex][fieldIndex] = updatedField;
    setFormSections(updatedSections);
  };

  const addRow = (sectionIndex: number) => {
    const updatedSections = [...formSections];
    updatedSections[sectionIndex].rows.push([]);
    setFormSections(updatedSections);
  };

  const removeField = (
    sectionIndex: number,
    rowIndex: number,
    fieldIndex: number
  ) => {
    const updatedSections = [...formSections];
    updatedSections[sectionIndex].rows[rowIndex].splice(fieldIndex, 1);
    setFormSections(updatedSections);
  };

  const removeSection = (sectionIndex: number) => {
    const updatedSections = [...formSections];
    updatedSections.splice(sectionIndex, 1);
    setFormSections(updatedSections);
  };

  const handleSave = () => {
    onSave(formSections);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl mb-4">Form Builder</h2>
      {formSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              value={section.sectionName}
              onChange={(e) =>
                updateSectionName(sectionIndex, e.target.value)
              }
              className="border p-2 flex-1 mr-4"
            />
            <button
              onClick={() => removeSection(sectionIndex)}
              className="text-red-500"
            >
              Remove Section
            </button>
          </div>
          {section.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-4">
              <h4 className="mb-2">Row {rowIndex + 1}</h4>
              <div className="grid grid-cols-12 gap-4">
                {row.map((field, fieldIndex) => (
                  <div key={field.name} className="col-span-6">
                    <FieldEditor
                      field={field}
                      onChange={(updatedField) =>
                        updateField(
                          sectionIndex,
                          rowIndex,
                          fieldIndex,
                          updatedField
                        )
                      }
                      onRemove={() =>
                        removeField(sectionIndex, rowIndex, fieldIndex)
                      }
                    />
                  </div>
                ))}
                <div className="col-span-12">
                  <button
                    onClick={() => addField(sectionIndex, rowIndex)}
                    className="text-blue-500"
                  >
                    Add Field
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => addRow(sectionIndex)}
            className="text-green-500"
          >
            Add Row
          </button>
        </div>
      ))}
      <button onClick={addSection} className="mb-4 text-blue-500">
        Add Section
      </button>
      <br />
      <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
        Save Form
      </button>
    </div>
  );
};

interface FieldEditorProps {
  field: FormField;
  onChange: (field: FormField) => void;
  onRemove: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({
  field,
  onChange,
  onRemove,
}) => {
  const [showOptions, setShowOptions] = useState(field.type === "select" || field.type === "radio");

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...field, [name]: value });
    if (name === "type") {
      setShowOptions(value === "select" || value === "radio");
    }
  };

  const handleValidationChange = (index: number, key: string, value: any) => {
    const updatedValidations = [...(field.validations || [])];
    updatedValidations[index] = { ...updatedValidations[index], [key]: value };
    onChange({ ...field, validations: updatedValidations });
  };

  const addValidation = () => {
    const newValidation: FormValidation = { type: "required", message: "This field is required" };
    onChange({ ...field, validations: [...(field.validations || []), newValidation] });
  };

  const removeValidation = (index: number) => {
    const updatedValidations = [...(field.validations || [])];
    updatedValidations.splice(index, 1);
    onChange({ ...field, validations: updatedValidations });
  };

  const addOption = () => {
    const newOption: FormFieldOption = { label: "Option", value: "option" };
    onChange({ ...field, options: [...(field.options || []), newOption] });
  };

  const updateOption = (index: number, key: string, value: string) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions[index] = { ...updatedOptions[index], [key]: value };
    onChange({ ...field, options: updatedOptions });
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions.splice(index, 1);
    onChange({ ...field, options: updatedOptions });
  };

  return (
    <div className="border p-2 rounded">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold">Field</h5>
        <button onClick={onRemove} className="text-red-500">
          Remove
        </button>
      </div>
      <div className="mb-2">
        <label className="block text-sm">Label:</label>
        <input
          type="text"
          name="label"
          value={field.label}
          onChange={handleFieldChange}
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Name:</label>
        <input
          type="text"
          name="name"
          value={field.name}
          onChange={handleFieldChange}
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Type:</label>
        <select
          name="type"
          value={field.type}
          onChange={handleFieldChange}
          className="border p-1 w-full"
        >
          {fieldTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {showOptions && (
        <div className="mb-2">
          <label className="block text-sm">Options:</label>
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex items-center mb-1">
              <input
                type="text"
                value={option.label}
                onChange={(e) => updateOption(index, "label", e.target.value)}
                placeholder="Label"
                className="border p-1 mr-2 flex-1"
              />
              <input
                type="text"
                value={option.value}
                onChange={(e) => updateOption(index, "value", e.target.value)}
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
      )}
      <div className="mb-2">
        <label className="block text-sm">Grid Layout:</label>
        <input
          type="text"
          name="gridLayout"
          value={field.gridLayout}
          onChange={handleFieldChange}
          placeholder="e.g., col-span-6"
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Validations:</label>
        {(field.validations || []).map((validation, index) => (
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
    </div>
  );
};

export default FormBuilder;
