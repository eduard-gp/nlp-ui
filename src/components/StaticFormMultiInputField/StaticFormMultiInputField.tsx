import React, { useEffect, useState } from "react";

function StaticFormMultiInputField({
    elements,
    label,
    handleMultiInputFieldChange,
    handleMultiInputFieldDelete,
    handleAddField,
    disabled
}: {
    elements: any,
    label: string,
    handleMultiInputFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>, label: string, index: number) => void,
    handleMultiInputFieldDelete: (e: React.MouseEvent<HTMLButtonElement>, label: string, index: number) => void,
    handleAddField: (e: React.MouseEvent<HTMLButtonElement>, label: string) => void,
    disabled: boolean,
}) {
    // const [disabledState, setDisabledState] = useState<boolean>(disabled);

    // useEffect(() => {
    //     setDisabledState(disabled);
    // }, [disabled]);

    return (
        <div className="variable-form-group">
            <label><div>{`${label}:`}</div><div>(Type: Static Multi Input)</div></label>
            <div className="entity">
                {elements[label].map((element: any, index: number) => 
                    <div className="multi-input" key={`${label}-${index}`}>
                        <textarea value={element}
                            onChange={(e) => handleMultiInputFieldChange(e, label, index)}
                            spellCheck={false}
                            disabled={disabled} />
                        <button className="btn btn-variable-form"
                                onClick={(e) => handleMultiInputFieldDelete(e, label, index)}
                                disabled={disabled}>
                                    Delete Field
                        </button>
                    </div>
                )}
            </div>
            <div className="buttons-container">
                <button className="btn btn-variable-form"
                    onClick={(e) => handleAddField(e, label)}
                    disabled={disabled}>
                        Add Field
                </button>
            </div>
        </div>
    );
}

export default StaticFormMultiInputField;