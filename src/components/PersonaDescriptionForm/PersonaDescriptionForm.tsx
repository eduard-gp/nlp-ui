import { VariableForm } from "../";

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
    return (
        <VariableForm
            disabled={disabled}
            title={title}
            elements={description}
            handleFormChange={handleFormChange}/>
    );
}

export default PersonaDescriptionForm;