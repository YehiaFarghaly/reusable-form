import React from "react";
import { Button as ShadcnButton } from "../components/ui/button";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

const FormButton: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  type, 
  disabled = false,
  variant = 'default',
  size = 'default'
}) => (
  <ShadcnButton
    type={type}
    onClick={onClick}
    disabled={disabled}
    variant={variant}
    size={size}
    className="transition-all duration-200 hover:shadow-md"
  >
    {text}
  </ShadcnButton>
);

export default FormButton;