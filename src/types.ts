
export interface FormField {
  name: string;
  label: string;
  type: string;
  options?: { label: string; value: string }[]; 
  gridLayout?: string; 
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (data: any) => void;
}
