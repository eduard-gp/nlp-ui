import React from "react";
import { useSelector } from "react-redux";

import { DialogEntity } from "../../pages/PersonaPage/models";
import { selectLabels } from "../../store/infoSlice";
import { StaticFormMultiInputField } from "../";

import "./PersonaDialogForm.css";

function PersonaDialogForm({
    title,
    dialog,
    disabled,
    handleFormChange,
}: {
    title?: string,
    dialog: Array<DialogEntity> | undefined,
    disabled: boolean,
    handleFormChange: any
}) {    
    const labels = useSelector(selectLabels);

    function simpleDeepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    function handleMultiInputFieldChange(index: number, e: React.ChangeEvent<HTMLTextAreaElement>, label: string, i: number) {
        const copyFormState = simpleDeepCopy(dialog);
        copyFormState[index][label][i] = e.target.value;
        handleFormChange(copyFormState);
    }

    function handleMultiInputFieldDelete(index: number, e: React.MouseEvent<HTMLButtonElement>, label: string, i: number) {
        const copyFormState = simpleDeepCopy(dialog);
        const copyArray = [];
        for (let i = 0; i < copyFormState[index][label].length; i++) {
            if (i !== index) {
                copyArray.push(copyFormState[index][label][i]);
            }
        }
        copyFormState[index][label] = copyArray;
        handleFormChange(copyFormState);
    }

    function handleAddField(index: number, e: React.MouseEvent<HTMLButtonElement>, label: string) {
        const copyFormState = simpleDeepCopy(dialog);
        copyFormState[index][label].push("");
        handleFormChange(copyFormState);
    }

    function handleLabelChange(index: number, e: React.ChangeEvent<HTMLSelectElement>) {
        const copyFormState = simpleDeepCopy(dialog);
        copyFormState[index]["label"] = e.target.value;
        handleFormChange(copyFormState);
    }
    if (!dialog || dialog.length <= 0) {
        return <div></div>
    } else {
        return (
            <div className="persona-dialog-form">
                {title && <h1 className="persona-dialog-title">{title}</h1>}
                {dialog.map((dialogEntity, index) =>
                    <div className="dialog-entity"
                        key={index}>
                        <h2>Dialog Entity:</h2>
                        <label className="dialog-entity-label">Intention:</label>
                        <select className="dialog-entity-value"
                            value={dialogEntity.label}
                            onChange={(e) => handleLabelChange(index, e)}
                            disabled={disabled}>
                            {labels.map((label: string, i: number) => <option value={label}
                                                        key={`${label}-${i}`}>
                                                            {label}
                                                      </option>)}
                        </select>
                        <StaticFormMultiInputField
                            elements={dialogEntity}
                            label="questions"
                            handleMultiInputFieldChange={(e, label, i) => handleMultiInputFieldChange(index, e, label, i)}
                            handleMultiInputFieldDelete={(e, label, i) => handleMultiInputFieldDelete(index, e, label, i)}
                            handleAddField={(e, label) => handleAddField(index, e, label)}
                            disabled={disabled} />
                        <StaticFormMultiInputField
                            elements={dialogEntity}
                            label="answers"
                            handleMultiInputFieldChange={(e, label, i) => handleMultiInputFieldChange(index, e, label, i)}
                            handleMultiInputFieldDelete={(e, label, i) => handleMultiInputFieldDelete(index, e, label, i)}
                            handleAddField={(e, label) => handleAddField(index, e, label)}
                            disabled={disabled} />
                    </div>
                )}
            </div>
        );
    }
}

export default PersonaDialogForm;