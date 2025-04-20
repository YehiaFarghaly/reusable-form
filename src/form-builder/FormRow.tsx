import React from "react";
import { FormField, FormSection as FormSectionType } from "../types";
import FieldEditor from "./FieldEditor";
import { Button } from "../components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

let ctr: number = 1;

interface FormRowProps {
  row: FormSectionType["rows"][0];
  rowIndex: number;
  onUpdate: (row: FormSectionType["rows"][0]) => void;
  onRemoveRow: () => void;
}

const FormRow: React.FC<FormRowProps> = ({
  row,
  rowIndex,
  onUpdate,
  onRemoveRow,
}) => {
  const addField = () => {
    const newField: FormField = {
      name: `field_${ctr++}`,
      label: "New Field",
      type: "text",
      gridLayout: "col-span-6",
      validations: [],
      uiSettings: {
        validationPosition: "bottom",
        size: "medium",
        iconEnabled: false
      }
    };
    onUpdate([...row, newField]);
  };

  const updateField = (
    fieldIndex: number,
    updatedField: FormField
  ) => {
    const updatedRow = [...row];
    updatedRow[fieldIndex] = updatedField;
    onUpdate(updatedRow);
  };

  const removeField = (fieldIndex: number) => {
    const updatedRow = [...row];
    updatedRow.splice(fieldIndex, 1);
    onUpdate(updatedRow);
  };

  return (
    <div className="border border-border rounded-md p-4 transition-all duration-200 hover:shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-muted-foreground">Row {rowIndex + 1}</h4>
        <Button 
          onClick={onRemoveRow} 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove Row
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {row.map((field, fieldIndex) => (
          <div key={fieldIndex} className="col-span-12 sm:col-span-6">
            <FieldEditor
              field={field}
              onChange={(updatedField) => updateField(fieldIndex, updatedField)}
              onRemove={() => removeField(fieldIndex)}
            />
          </div>
        ))}
        {row.length === 0 && (
          <div className="col-span-12 text-center p-4 border border-dashed rounded-md border-muted-foreground/30 text-muted-foreground">
            No fields added to this row yet
          </div>
        )}
      </div>
      <div className="mt-4">
        <Button
          onClick={addField}
          variant="outline"
          size="sm"
          className="w-full text-muted-foreground border-dashed"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>
    </div>
  );
};

export default FormRow;