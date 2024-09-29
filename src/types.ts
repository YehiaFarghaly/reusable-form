export interface FormField {
  name: string;
  label: string;
  type: string;
  validation?: any;
  options?: { label: string; value: string }[];
  gridLayout?: string;
  isDynamic?: boolean;
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
