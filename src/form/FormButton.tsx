import React from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    type: 'submit' | 'reset' | 'button';
    disabled?: boolean
};

const FormButton: React.FC<ButtonProps> = ({ text, onClick, type, disabled}) => (
    <button
        type={type}
        className={`mt-2 py-2 px-6 bg-purple-500 text-white rounded-lg transform transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-300`}
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </button>
);

export default FormButton;
