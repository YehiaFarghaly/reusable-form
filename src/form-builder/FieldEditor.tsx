import React, { useState } from "react";
import { FormField } from "../types";
import ValidationEditor from "./ValidationEditor";
import OptionEditor from "./OptionEditor";

const fieldTypes = [
    "text", "number", "email", "select", "slider", "checkbox", "radio", "file", "date",
];

interface FieldEditorProps {
    field: FormField;
    onChange: (field: FormField) => void;
    onRemove: () => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({
    field, onChange, onRemove
}) => {
    const [showOptions, setShowOptions] = useState(field.type === "select" || field.type === "radio");
    const [showUISettings, setShowUISettings] = useState(false);

    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        onChange({ ...field, [name]: value });
        if (name === "type") {
            setShowOptions(value === "select" || value === "radio");
            if (!(value === "select" || value === "radio")) {
                onChange({ ...field, type: value, options: [] });
            }
        }
    };

    const handleDynamicToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...field, isDynamic: e.target.checked });
    };

    const handleUISettingsChange = (key: string, value: any) => {
        onChange({
            ...field,
            uiSettings: { ...field.uiSettings, [key]: value },
        });
    };

    return (
        <div className="border p-2 rounded">
            <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">Field</h5>
                <button onClick={onRemove} className="text-red-500">
                    Remove
                </button>
            </div>
            <div className="mb-2">
                <label className="block text-sm">Label:</label>
                <input
                    type="text"
                    name="label"
                    value={field.label}
                    onChange={handleFieldChange}
                    className="border p-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={field.name}
                    onChange={handleFieldChange}
                    className="border p-1 w-full"
                />
            </div>
            <div className="mb-2">
                <input
                    type="checkbox"
                    name="isDynamic"
                    checked={field.isDynamic || false}
                    onChange={handleDynamicToggle}
                    className="mr-2"
                />
                <span>Dynamic Field</span>
            </div>
            <div className="mb-2">
                <label className="block text-sm">Type:</label>
                <select
                    name="type"
                    value={field.type}
                    onChange={handleFieldChange}
                    className="border p-1 w-full"
                >
                    {fieldTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {showOptions && (
                <OptionEditor
                    options={field.options || []}
                    onChange={(updatedOptions) =>
                        onChange({ ...field, options: updatedOptions })
                    }
                />
            )}



            <div className="mb-2">
                <label className="block text-sm">Grid Layout:</label>
                <input
                    type="text"
                    name="gridLayout"
                    value={field.gridLayout}
                    onChange={handleFieldChange}
                    placeholder="e.g., col-span-6"
                    className="border p-1 w-full"
                />
            </div>
            <ValidationEditor
                validations={field.validations || []}
                onChange={(updatedValidations) =>
                    onChange({ ...field, validations: updatedValidations })
                }
            />
            <button
                onClick={() => setShowUISettings(!showUISettings)}
                className="text-blue-500 text-sm mb-2"
            >
                {showUISettings ? "Hide" : "Show"} UI Settings
            </button>

            {showUISettings && (
                <div className="mb-2 border p-2 rounded bg-gray-100">
                    <div className="mb-2">
                        <label className="block text-sm">Validation Position:</label>
                        <select
                            value={field.uiSettings?.validationPosition || "top"}
                            onChange={(e) =>
                                handleUISettingsChange("validationPosition", e.target.value)
                            }
                            className="border p-1 w-full"
                        >
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Size:</label>
                        <select
                            value={field.uiSettings?.size || "medium"}
                            onChange={(e) => handleUISettingsChange("size", e.target.value)}
                            className="border p-1 w-full"
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Icon Enabled:</label>
                        <input
                            type="checkbox"
                            checked={field.uiSettings?.iconEnabled || false}
                            onChange={(e) =>
                                handleUISettingsChange("iconEnabled", e.target.checked)
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FieldEditor;
