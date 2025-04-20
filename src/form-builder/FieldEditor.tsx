import React, { useState } from "react";
import { FormField } from "../types";
import ValidationEditor from "./ValidationEditor";
import OptionEditor from "./OptionEditor";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { ChevronDown, ChevronUp, Settings, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const fieldTypes = [
  "text", "number", "email", "select", "slider", "checkbox", "radio", "file", "date",
];

interface FieldEditorProps {
  field: FormField;
  onChange: (field: FormField) => void;
  onRemove: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({
  field, onChange, onRemove
}) => {
  const [expanded, setExpanded] = useState(false);
  const showOptions = field.type === "select" || field.type === "radio";

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...field, [name]: value });
  };

  const handleFieldTypeChange = (value: string) => {
    onChange({ 
      ...field, 
      type: value,
      options: value === "select" || value === "radio" ? (field.options || []) : []
    });
  };

  const handleDynamicToggle = (checked: boolean) => {
    onChange({ ...field, isDynamic: checked });
  };

  const handleUISettingsChange = (key: string, value: any) => {
    onChange({
      ...field,
      uiSettings: { ...field.uiSettings, [key]: value },
    });
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-sm">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">{field.label || "New Field"}</CardTitle>
        <div className="flex items-center gap-1">
          <Button 
            onClick={() => setExpanded(!expanded)} 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button 
            onClick={onRemove} 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="px-4 py-3 space-y-4">
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor={`label-${field.name}`}>Label:</Label>
              <Input
                id={`label-${field.name}`}
                type="text"
                name="label"
                value={field.label}
                onChange={handleFieldChange}
                placeholder="Field Label"
              />
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor={`name-${field.name}`}>Name:</Label>
              <Input
                id={`name-${field.name}`}
                type="text"
                name="name"
                value={field.name}
                onChange={handleFieldChange}
                placeholder="field_name"
              />
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor={`type-${field.name}`}>Type:</Label>
              <Select
                value={field.type}
                onValueChange={handleFieldTypeChange}
              >
                <SelectTrigger id={`type-${field.name}`}>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id={`dynamic-${field.name}`}
                checked={field.isDynamic || false}
                onCheckedChange={handleDynamicToggle}
              />
              <Label htmlFor={`dynamic-${field.name}`}>Dynamic Field</Label>
            </div>
            
            <div className="grid gap-1.5">
              <Label htmlFor={`grid-${field.name}`}>Grid Layout:</Label>
              <Select
                value={field.gridLayout || "col-span-12"}
                onValueChange={(value) => onChange({ ...field, gridLayout: value })}
              >
                <SelectTrigger id={`grid-${field.name}`}>
                  <SelectValue placeholder="Select grid width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="col-span-12">Full Width</SelectItem>
                  <SelectItem value="col-span-6">Half Width</SelectItem>
                  <SelectItem value="col-span-4">One Third</SelectItem>
                  <SelectItem value="col-span-3">One Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {showOptions && (
              <AccordionItem value="options">
                <AccordionTrigger className="py-2">Options</AccordionTrigger>
                <AccordionContent>
                  <OptionEditor
                    options={field.options || []}
                    onChange={(updatedOptions) =>
                      onChange({ ...field, options: updatedOptions })
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            )}
            
            <AccordionItem value="validations">
              <AccordionTrigger className="py-2">Validations</AccordionTrigger>
              <AccordionContent>
                <ValidationEditor
                  validations={field.validations || []}
                  onChange={(updatedValidations) =>
                    onChange({ ...field, validations: updatedValidations })
                  }
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ui-settings">
              <AccordionTrigger className="py-2">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  UI Settings
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor={`validation-pos-${field.name}`}>Validation Position:</Label>
                    <Select
                      value={field.uiSettings?.validationPosition || "bottom"}
                      onValueChange={(value) => 
                        handleUISettingsChange("validationPosition", value)
                      }
                    >
                      <SelectTrigger id={`validation-pos-${field.name}`}>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-1.5">
                    <Label htmlFor={`size-${field.name}`}>Size:</Label>
                    <Select
                      value={field.uiSettings?.size || "medium"}
                      onValueChange={(value) => 
                        handleUISettingsChange("size", value)
                      }
                    >
                      <SelectTrigger id={`size-${field.name}`}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`icon-${field.name}`}
                      checked={field.uiSettings?.iconEnabled || false}
                      onCheckedChange={(checked) =>
                        handleUISettingsChange("iconEnabled", checked)
                      }
                    />
                    <Label htmlFor={`icon-${field.name}`}>Show Icon</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
      
      {!expanded && (
        <CardFooter className="px-4 py-2 text-xs text-muted-foreground">
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
          {field.validations && field.validations.some(v => v.type === "required") && 
            " • Required"}
          {field.isDynamic && " • Dynamic"}
        </CardFooter>
      )}
    </Card>
  );
};

export default FieldEditor;