import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { cn } from "../components/lib/utils";

// Import icons from lucide-react instead of react-icons
import { 
  Calendar, 
  Mail, 
  User, 
  Hash, 
  Check, 
  List, 
  SlidersHorizontal, 
  File,
  FileText 
} from "lucide-react";

type FormInputProps = {
  field: FormField;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
};

const getIconForFieldType = (type: string, iconEnabled: boolean = false) => {
  if (!iconEnabled) return null;
  
  switch (type) {
    case 'text': return <User className="w-4 h-4" />;
    case 'email': return <Mail className="w-4 h-4" />;
    case 'number': return <Hash className="w-4 h-4" />;
    case 'date': return <Calendar className="w-4 h-4" />;
    case 'checkbox': return <Check className="w-4 h-4" />;
    case 'select': return <List className="w-4 h-4" />;
    case 'radio': return <List className="w-4 h-4" />;
    case 'slider': return <SlidersHorizontal className="w-4 h-4" />;
    case 'file': return <File className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const FormLabel: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => (
  <div className="flex items-center gap-2 mb-2">
    {icon}
    <Label className="font-medium">{label}</Label>
  </div>
);

const ErrorMessage: React.FC<{ message?: string; position?: string }> = ({ 
  message, 
  position = "bottom" 
}) => message ? (
  <p className={cn(
    "text-destructive text-sm transition-all",
    position === "top" ? "mb-1" : "mt-1"
  )}>
    {message}
  </p>
) : null;

const FormInput: React.FC<FormInputProps> = ({ field, register, error }) => {
  const { 
    validationPosition = "bottom", 
    size = "medium", 
    iconEnabled = false 
  } = field.uiSettings || {};

  const sizeClass = size === "small" ? "text-sm" : size === "large" ? "text-lg" : "text-base";
  const icon = getIconForFieldType(field.type, iconEnabled);
  
  const renderInput = () => {
    switch (field.type) {
      case "select":
        return (
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger className={cn("w-full", error && "border-destructive")}>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup defaultValue={field.options?.[0]?.value} className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
                <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "slider":
        return <Slider defaultValue={[20]} max={100} step={1} className="py-4" />;
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.name} {...register(field.name)} />
            <Label htmlFor={field.name} className={sizeClass}>
              {field.label}
            </Label>
          </div>
        );
      default:
        return (
          <Input 
            type={field.type} 
            {...register(field.name)} 
            className={cn(
              sizeClass, 
              error && "border-destructive focus:ring-destructive"
            )} 
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className={field.gridLayout || "col-span-12"}>
      <div className="space-y-1.5">
        {field.type !== "checkbox" && (
          <FormLabel label={field.label} icon={icon} />
        )}
        {validationPosition === "top" && <ErrorMessage message={error} position="top" />}
        {renderInput()}
        {validationPosition === "bottom" && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default FormInput;