import React from "react";

function VariableFormMultiInputField({
    elements,
    label,
    handleMultiInputFieldChange,
    handleMultiInputFieldDelete,
    handleDeleteGroup,
    handleAddField,
    disabled
}: {
    elements: any,
    label: string,
    handleMultiInputFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>, label: string, index: number) => void,
    handleMultiInputFieldDelete: (e: React.MouseEvent<HTMLButtonElement>, label: string, index: number) => void,
    handleDeleteGroup: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void,
    handleAddField: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void,
    disabled: boolean,
}) {
    return (
        <div className="variable-form-group">
            <label><div>{`${label}:`}</div><div>(Type: Multi Input)</div></label>
            <div className="entity">
                {elements[label].map((element: any, index: number) => 
                    <div className="multi-input" key={`${label}-${index}`}>
                        <textarea value={element}
                            onChange={(e) => handleMultiInputFieldChange(e, label, index)}
                            spellCheck={false}
                            disabled={disabled} />
                        <button className="btn btn-variable-form"
                                onClick={(e) => handleMultiInputFieldDelete(e, label, index)}>
                                    Delete Field
                        </button>
                    </div>
                )}
            </div>
            <div className="buttons-container">
                <button className="btn btn-variable-form"
                    onClick={(e) => handleDeleteGroup(e, label)}
                    disabled={disabled}>
                        Delete Group
                </button>
                <button className="btn btn-variable-form"
                    onClick={(e) => handleAddField(e, label)}
                    disabled={disabled}>
                        Add Field
                </button>
            </div>
        </div>
    );
}

export default VariableFormMultiInputField;