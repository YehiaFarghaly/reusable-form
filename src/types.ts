// types.ts
export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormValidation {
  type: string;
  value?: any;  
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  options?: FormFieldOption[]; 
  gridLayout?: string;
  isDynamic?: boolean;
  validations?: FormValidation[];
}

export interface FormRow extends Array<FormField> {}

export interface FormSection {
  sectionName: string;
  rows: FormRow[];
}

export interface FormProps {
  formSections: FormSection[];
  onSubmit: (data: any) => void;
}
