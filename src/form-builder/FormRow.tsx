import { FormField, FormSection as FormSectionType } from "../types";
import FieldEditor from "./FieldEditor";

let ctr: number = 1;

interface FormRowProps {
    row: FormSectionType["rows"][0];
    rowIndex: number;
    onUpdate: (row: FormSectionType["rows"][0]) => void;
    onRemoveRow: () => void;
}

const FormRow: React.FC<FormRowProps> = ({
    row,
    rowIndex,
    onUpdate,
    onRemoveRow,
}) => {
    const addField = () => {
        const newField: FormField = {
            name: `field_${ctr++}`,
            label: "New Field",
            type: "text",
            gridLayout: "col-span-6",
            validations: [],
            uiSettings: {
                validationPosition: "bottom",
                size: "large",
                iconEnabled: false
            }

        };
        onUpdate([...row, newField]);
    };

    const updateField = (
        fieldIndex: number,
        updatedField: FormField
    ) => {
        const updatedRow = [...row];
        updatedRow[fieldIndex] = updatedField;
        onUpdate(updatedRow);
    };

    const removeField = (fieldIndex: number) => {
        const updatedRow = [...row];
        updatedRow.splice(fieldIndex, 1);
        onUpdate(updatedRow);
    };

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="mb-2">Row {rowIndex + 1}</h4>
                <button onClick={onRemoveRow} className="text-red-500 text-sm">
                    Remove Row
                </button>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {row.map((field, fieldIndex) => (
                    <div key={field.name} className="col-span-6">
                        <FieldEditor
                            field={field}
                            onChange={(updatedField) => updateField(fieldIndex, updatedField)}
                            onRemove={() => removeField(fieldIndex)}
                        />
                    </div>
                ))}
                <div className="col-span-12">
                    <button
                        onClick={addField}
                        className="text-purple-500 text-sm"
                    >
                        Add Field
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormRow;
