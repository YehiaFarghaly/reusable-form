import React from "react";
import { FormFieldOption } from "../types";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Trash2 } from "lucide-react";

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
    const newOption: FormFieldOption = { label: "New Option", value: `option_${options.length + 1}` };
    onChange([...options, newOption]);
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    onChange(updatedOptions);
  };

  return (
    <div className="space-y-3">
      {options.length === 0 && (
        <div className="text-center p-3 border border-dashed rounded-md border-muted-foreground/30 text-muted-foreground text-sm">
          No options added yet
        </div>
      )}
      
      {options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            type="text"
            value={option.label}
            onChange={(e) =>
              handleOptionChange(index, "label", e.target.value)
            }
            placeholder="Label"
            className="flex-1"
          />
          <Input
            type="text"
            value={option.value}
            onChange={(e) =>
              handleOptionChange(index, "value", e.target.value)
            }
            placeholder="Value"
            className="flex-1"
          />
          <Button
            onClick={() => removeOption(index)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        onClick={addOption}
        variant="outline"
        size="sm"
        className="w-full mt-2 border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
};

export default OptionEditor;