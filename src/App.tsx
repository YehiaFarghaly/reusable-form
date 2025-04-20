import React, { useState } from "react";
import * as yup from "yup";
import FormComponent from "./form/FormComponent";
import FormBuilder from "./form-builder/FormBuilder";
import { FormSection } from "./types";
import { generateValidationSchema } from "./utils/FormUtils";
import { ThemeProvider } from "./form/theme.provider";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/useToast";

const App: React.FC = () => {
  const [isMultiStep, setIsMultiStep] = useState(false);
  const [formSections, setFormSections] = useState<FormSection[]>([]);
  const { toast } = useToast();

  const validationSchema: yup.ObjectSchema<any> = generateValidationSchema(formSections);

  const onSave = (sections: FormSection[], multiStep: boolean) => {
    setFormSections(sections);
    setIsMultiStep(multiStep);
    toast({
      title: "Form saved!",
      description: "Your form has been created successfully.",
    });
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    toast({
      title: "Form submitted!",
      description: "Form data has been processed successfully.",
    });
  };

  const resetForm = () => {
    setFormSections([]);
    toast({
      title: "Form reset",
      description: "Form builder has been restored.",
    });
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="form-builder-theme">
      <div className="min-h-screen bg-background">
        <header className="py-6 border-b border-border">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dynamic Form Builder</h1>
          </div>
        </header>
        <main className="container px-4 md:px-6 py-6 md:py-10">
          {formSections.length === 0 ? (
            <FormBuilder onSave={onSave} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Form Preview</h2>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-destructive/90 h-10 px-4 py-2 bg-destructive"
                >
                  Reset Form
                </button>
              </div>
              <FormComponent
                formSections={formSections}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                isMultiStep={isMultiStep}
              />
            </div>
          )}
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;