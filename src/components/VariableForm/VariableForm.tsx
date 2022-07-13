import React, { useEffect, useState } from "react";
import { VariableFormInputField, VariableFormMultiInputField } from "../";

import "./VariableForm.css";

function VariableForm({
    elements,
    title,
    disabled,
    handleFormChange,
}: {
    elements: any,
    title?: string,
    disabled: boolean,
    handleFormChange: any
}) {
    const [newFieldLabel, setNewFieldLabel] = useState<string>("");

    function simpleDeepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    function handleInputFieldChange(e: React.ChangeEvent<HTMLTextAreaElement>, key: string) {
        const copyFormState = simpleDeepCopy(elements);
        copyFormState[key] = e.target.value;
        handleFormChange(copyFormState);
    }

    function handleDeleteGroup(e: React.MouseEvent<HTMLButtonElement>, key: string) {
        const copyFormState = simpleDeepCopy(elements);
        delete copyFormState[key];
        handleFormChange(copyFormState);
    }

    function handleMultiInputFieldChange(e: React.ChangeEvent<HTMLTextAreaElement>, key: string, index: number) {
        const copyFormState = simpleDeepCopy(elements);
        copyFormState[key][index] = e.target.value;
        handleFormChange(copyFormState);
    }

    function handleMultiInputFieldDelete(e: React.MouseEvent<HTMLButtonElement>, key: string, index: number) {
        const copyFormState = simpleDeepCopy(elements);
        const copyArray = [];
        for (let i = 0; i < copyFormState[key].length; i++) {
            if (i !== index) {
                copyArray.push(copyFormState[key][i]);
            }
        }
        copyFormState[key] = copyArray;
        handleFormChange(copyFormState);
    }

    function handleAddField(e: React.MouseEvent<HTMLButtonElement>, key: string) {
        const copyFormState = simpleDeepCopy(elements);
        copyFormState[key].push("");
        handleFormChange(copyFormState);
    }

    function handleNewFieldLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewFieldLabel(e.target.value);
    }

    function handleAddVariableInputField() {
        const copyFormState = simpleDeepCopy(elements);
        copyFormState[newFieldLabel] = "";
        handleFormChange(copyFormState);
        setNewFieldLabel("");
    }

    function handleAddVariableMultiInputField() {
        const copyFormState = simpleDeepCopy(elements);
        copyFormState[newFieldLabel] = [""];
        handleFormChange(copyFormState);
        setNewFieldLabel("");
    }

    function constructForm(elements: any): React.ReactNode {
        const form = [];
        for (const label in elements) {
            if (!Array.isArray(elements[label])) {
                form.push(<VariableFormInputField
                    key={label}
                    elements={elements}
                    label={label}
                    handleInputFieldChange={handleInputFieldChange}
                    handleDeleteGroup={handleDeleteGroup}
                    disabled={disabled}
                    disabledDeleteGroup={label.toLowerCase() === "case" || disabled} />)
            } else {
                form.push(<VariableFormMultiInputField
                    key={label}
                    elements={elements}
                    label={label}
                    handleMultiInputFieldChange={handleMultiInputFieldChange}
                    handleMultiInputFieldDelete={handleMultiInputFieldDelete}
                    handleDeleteGroup={handleDeleteGroup}
                    handleAddField={handleAddField}
                    disabled={disabled}
                />)
            }
        }
        return form;
    }

    if (!elements) {
        return <div></div>
    } else {
        return (
            <div className="variable-form">
                {title && <h1 className="variable-form-title">{title}</h1>}
                {constructForm(elements)}
                <div className="variable-form-menu">
                    <label>Label:</label>
                    <input className="label-input"
                        value={newFieldLabel}
                        onChange={handleNewFieldLabelChange}
                        disabled={disabled} />
                    <button className="btn btn-variable-form-menu"
                        onClick={handleAddVariableInputField}
                        disabled={disabled}>Add Input</button>
                    <button className="btn btn-variable-form-menu"
                        onClick={handleAddVariableMultiInputField}
                        disabled={disabled}>Add Multi Input</button>
                </div>
            </div>
        );
    }

}

export default VariableForm;