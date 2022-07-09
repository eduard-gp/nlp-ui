import { copyFile } from "fs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { VariableFormInputField, VariableFormMultiInputField } from "../";

import "./VariableForm.css";

function VariableForm({
    elements,
    title
}: {
    elements: any,
    title: string
}) {
    const [formState, setFormState] = useState([]);
    const [initialFromState, setInitialFormState] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [newFieldLabel, setNewFieldLabel] = useState("");

    function simpleDeepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    useEffect(() => {
        setFormState(elements);
        setInitialFormState(elements);
        setDisabled(true);
        setNewFieldLabel("");
    }, [elements]);

    function handleInputFieldChange(e: React.ChangeEvent<HTMLTextAreaElement>, key: string) {
        const copyFormState = simpleDeepCopy(formState);
        setFormState({ ...copyFormState, [key]: e.target.value })
    }

    function handleDeleteGroup(e: React.MouseEvent<HTMLButtonElement>, key: string) {
        const copyFormState = simpleDeepCopy(formState);
        delete copyFormState[key];
        setFormState(copyFormState);
    }

    function handleMultiInputFieldChange(e: React.ChangeEvent<HTMLTextAreaElement>, label: string, index: number) {
        const copyFormState = simpleDeepCopy(formState);
        copyFormState[label][index] = e.target.value;
        setFormState(copyFormState);
    }

    function handleMultiInputFieldDelete(e: React.MouseEvent<HTMLButtonElement>, label: string, index: number) {
        const copyFormState = simpleDeepCopy(formState);
        const copyArray = [];
        for (let i = 0; i < copyFormState[label].length; i++) {
            if (i !== index) {
                copyArray.push(copyFormState[label][i]);
            }
        }
        copyFormState[label] = copyArray;
        setFormState(copyFormState);
    }

    function handleAddField(e: React.MouseEvent<HTMLButtonElement>, label: string) {
        const copyFormState = simpleDeepCopy(formState);
        copyFormState[label].push("");
        setFormState(copyFormState);
    }

    function handleNewFieldLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewFieldLabel(e.target.value);
    }

    function handleAddVariableInputField() {
        const copyFormState = simpleDeepCopy(formState);
        copyFormState[newFieldLabel] = "";
        setFormState(copyFormState);
        setNewFieldLabel("");
    }

    function handleAddVariableMultiInputField() {
        const copyFormState = simpleDeepCopy(formState);
        copyFormState[newFieldLabel] = [""];
        setFormState(copyFormState);
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

    return (
        <div className="variable-form">
            <h1>{title}</h1>
            {constructForm(formState)}
            <div className="variable-form-menu">
                <button className="btn btn-variable-form-menu"
                    onClick={() => setDisabled(false)}>Edit</button>
                {/* <button className="btn btn-variable-form-menu">Save</button> */}
                {/* <button className="btn btn-variable-form-menu">Discard changes</button> */}
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
            {JSON.stringify(formState)}
            {disabled}
        </div>
    );
}

export default VariableForm;