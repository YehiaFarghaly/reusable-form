import React from "react";
import { FormSection as FormSectionType } from "../types";
import FormRow from "./FormRow";

interface FormSectionProps {
  section: FormSectionType;
  sectionIndex: number;
  onUpdate: (section: FormSectionType) => void;
  onRemove: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  sectionIndex,
  onUpdate,
  onRemove,
}) => {
  const updateSectionName = (name: string) => {
    onUpdate({ ...section, sectionName: name });
  };

  const addRow = () => {
    const updatedRows = [...section.rows, []];
    onUpdate({ ...section, rows: updatedRows });
  };

  const updateRow = (rowIndex: number, updatedRow: FormSectionType["rows"][0]) => {
    const updatedRows = [...section.rows];
    updatedRows[rowIndex] = updatedRow;
    onUpdate({ ...section, rows: updatedRows });
  };

  const removeRow = (rowIndex: number) => {
    const updatedRows = [...section.rows];
    updatedRows.splice(rowIndex, 1);
    onUpdate({ ...section, rows: updatedRows });
  };

  return (
    <div className="mb-6 p-4 bg-white rounded">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          value={section.sectionName}
          onChange={(e) => updateSectionName(e.target.value)}
          className="border p-2 flex-1 mr-4"
        />
        <button onClick={onRemove} className="text-red-500">
          Remove Section
        </button>
      </div>
      {section.rows.map((row, rowIndex) => (
        <FormRow
          key={rowIndex}
          row={row}
          sectionIndex={sectionIndex}
          rowIndex={rowIndex}
          onUpdate={(updatedRow) => updateRow(rowIndex, updatedRow)}
          onRemoveRow={() => removeRow(rowIndex)}
        />
      ))}
      <button onClick={addRow} className="text-blue-500 text-sm">
        Add Row
      </button>
    </div>
  );
};

export default FormSection;
