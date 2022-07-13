import { useEffect, useState } from "react";
import VariableForm from "../VariableForm/VariableForm";

function PersonaDescriptionForm({
    title,
    description,
    disabled,
    handleFormChange,
}: {
    title?: string
    description: any,
    disabled: boolean,
    handleFormChange: any
}) {
    // const [disabledState, setDisabledState] = useState<boolean>(disabled);
    // const [formState, setFormState] = useState<any>(description);

    // useEffect(() => {
    //     setDisabledState(disabled);
    // }, [disabled]);

    // useEffect(() => {
    //     setFormState(description);
    // })

    return (
        <VariableForm
            disabled={disabled}
            title={title}
            elements={description}
            handleFormChange={handleFormChange}/>
    );
}

export default PersonaDescriptionForm;