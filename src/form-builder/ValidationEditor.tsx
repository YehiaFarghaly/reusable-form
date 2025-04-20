import React from "react";
import { FormValidation } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

interface ValidationEditorProps {
  validations: FormValidation[];
  onChange: (validations: FormValidation[]) => void;
}

const ValidationEditor: React.FC<ValidationEditorProps> = ({ validations, onChange }) => {
  const validationTypes = [
    { value: "required", label: "Required" },
    { value: "min", label: "Min Length/Value" },
    { value: "max", label: "Max Length/Value" },
    { value: "email", label: "Email Format" },
    { value: "length", label: "Exact Length" },
    { value: "pattern", label: "Pattern (Regex)" },
  ];

  const handleValidationChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const updatedValidations = [...validations];
    updatedValidations[index] = { ...updatedValidations[index], [key]: value };
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

  const needsValueInput = (type: string) => {
    return ["min", "max", "length", "pattern"].includes(type);
  };

  return (
    <div className="space-y-3">
      {validations.length === 0 && (
        <div className="text-center p-3 border border-dashed rounded-md border-muted-foreground/30 text-muted-foreground text-sm">
          No validations added yet
        </div>
      )}
      
      {validations.map((validation, index) => (
        <div key={index} className="space-y-2 p-3 bg-muted/40 rounded-md">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Rule {index + 1}</Label>
            <Button
              onClick={() => removeValidation(index)}
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-2">
            <Select
              value={validation.type}
              onValueChange={(value) => 
                handleValidationChange(index, "type", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select validation type" />
              </SelectTrigger>
              <SelectContent>
                {validationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {needsValueInput(validation.type) && (
              <Input
                type="text"
                value={validation.value || ""}
                onChange={(e) =>
                  handleValidationChange(index, "value", e.target.value)
                }
                placeholder={
                  validation.type === "pattern" 
                    ? "Regular expression" 
                    : "Value"
                }
              />
            )}
            
            <Input
              type="text"
              value={validation.message}
              onChange={(e) =>
                handleValidationChange(index, "message", e.target.value)
              }
              placeholder="Error message"
            />
          </div>
        </div>
      ))}
      
      <Button
        onClick={addValidation}
        variant="outline"
        size="sm"
        className="w-full mt-2 border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Validation Rule
      </Button>
    </div>
  );
};

export default ValidationEditor;