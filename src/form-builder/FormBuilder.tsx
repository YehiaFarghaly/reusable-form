import React, { useState } from "react";
import { FormSection as FormSectionType } from "../types";
import FormSection from "./FormSection";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { PlusCircle, Save } from "lucide-react";

const FormBuilder: React.FC<{
  onSave: (formSections: FormSectionType[], isMultiStep: boolean) => void;
}> = ({ onSave }) => {
  const [formSections, setFormSections] = useState<FormSectionType[]>([]);
  const [isMultiStep, setIsMultiStep] = useState(false);

  const addSection = () => {
    const newSection: FormSectionType = {
      sectionName: `Section ${formSections.length + 1}`,
      rows: [[]],
    };
    setFormSections([...formSections, newSection]);
  };

  const updateSection = (index: number, updatedSection: FormSectionType) => {
    const updatedSections = [...formSections];
    updatedSections[index] = updatedSection;
    setFormSections(updatedSections);
  };

  const removeSection = (index: number) => {
    const updatedSections = [...formSections];
    updatedSections.splice(index, 1);
    setFormSections(updatedSections);
  };

  const handleSave = () => {
    if (formSections.length === 0) {
      alert("Please add at least one section before saving.");
      return;
    }
    onSave(formSections, isMultiStep);
  };

  return (
    <Card className="w-full shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle>Form Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-4 bg-muted rounded-md">
            <Switch
              id="multi-step"
              checked={isMultiStep}
              onCheckedChange={setIsMultiStep}
            />
            <Label htmlFor="multi-step" className="cursor-pointer">
              Make each section a separate step
            </Label>
          </div>

          <div className="space-y-4">
            {formSections.map((section, index) => (
              <FormSection
                key={index}
                section={section}
                onUpdate={(updatedSection) => updateSection(index, updatedSection)}
                onRemove={() => removeSection(index)}
              />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button 
              onClick={addSection} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Section
            </Button>
            
            <Button 
              onClick={handleSave} 
              variant="default" 
              className="flex items-center gap-2"
              disabled={formSections.length === 0}
            >
              <Save className="h-4 w-4" />
              Save Form
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormBuilder;