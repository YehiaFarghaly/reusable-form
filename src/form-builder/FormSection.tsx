import React from "react";
import { FormSection as FormSectionType } from "../types";
import FormRow from "./FormRow";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";

interface FormSectionProps {
  section: FormSectionType;
  onUpdate: (section: FormSectionType) => void;
  onRemove: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
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
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between gap-2">
          <Input
            type="text"
            value={section.sectionName}
            onChange={(e) => updateSectionName(e.target.value)}
            className="font-medium text-lg"
            placeholder="Section Name"
          />
          <Button 
            onClick={onRemove} 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-destructive"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        {section.rows.map((row, rowIndex) => (
          <FormRow
            key={rowIndex}
            row={row}
            rowIndex={rowIndex}
            onUpdate={(updatedRow) => updateRow(rowIndex, updatedRow)}
            onRemoveRow={() => removeRow(rowIndex)}
          />
        ))}
        <Button 
          onClick={addRow} 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-muted-foreground border-dashed"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> 
          Add Row
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormSection;