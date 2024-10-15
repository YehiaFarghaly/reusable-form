// FormBuilder.tsx
import React, { useState } from "react";
import { FormSection as FormSectionType } from "../types";
import FormSection from "./FormSection";

const FormBuilder: React.FC<{
  onSave: (formSections: FormSectionType[]) => void;
}> = ({ onSave }) => {
  const [formSections, setFormSections] = useState<FormSectionType[]>([]);

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
    onSave(formSections);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl mb-4">Form Builder</h2>
      {formSections.map((section, index) => (
        <FormSection
          key={index}
          section={section}
          sectionIndex={index}
          onUpdate={(updatedSection) => updateSection(index, updatedSection)}
          onRemove={() => removeSection(index)}
        />
      ))}
      <button onClick={addSection} className="mb-4 text-blue-500">
        Add Section
      </button>
      <br />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Save Form
      </button>
    </div>
  );
};

export default FormBuilder;
