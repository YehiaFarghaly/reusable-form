import React from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    type: 'submit' | 'reset' | 'button';
};

const FormButton: React.FC<ButtonProps> = ({ text, onClick, type }) => (
    <button
        type={type}
        className={`mt-2 py-2 px-6 bg-blue-500 text-white rounded-lg transform transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-indigo-300`}
        onClick={onClick}
    >
        {text}
    </button>
);

export default FormButton;
