import React from "react";

function VariableFormInputField({
    elements,
    label,
    handleInputFieldChange,
    handleDeleteGroup,
    disabled,
    disabledDeleteGroup,
}: {
    elements: any,
    label: string,
    handleInputFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>, label: string) => void,
    handleDeleteGroup: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void,
    disabled: boolean,
    disabledDeleteGroup: boolean
}) {
    return (
        <div className="variable-form-group">
            <label><div>{`${label}:`}</div><div>(Type: Input)</div></label>
            <div className="entity">
                <textarea value={elements[label]}
                    onChange={(e) => handleInputFieldChange(e, label)}
                    spellCheck={false}
                    disabled={disabled} />
            </div>
            <div className="buttons-container">
                <button className="btn btn-variable-form"
                        onClick={(e) => handleDeleteGroup(e, label)}
                        disabled={disabledDeleteGroup}>Delete Group</button>
            </div>
        </div>
    );
}

export default VariableFormInputField;