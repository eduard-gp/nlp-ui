import axios from "axios";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputFilter, PersonaDescriptionForm, PersonaDialogForm, VariableForm } from "../../components";
import { BASE_URL } from "../../config/config";
import { getInfo, selectLanguages } from "../../store/infoSlice";
import { selectDescriptionForm, selectDialogForm, selectDisabledStatus, selectForm, selectLanguageForm, selectSelectedPersona, setDescriptionForm, setDialogForm, setDisabled, setForm, setLanguageForm, setSelectedPersona } from "../../store/personaFormSlice";
import { addPersona, getPersonas, selectPersonas, updatePersona } from "../../store/personasSlice";
import { AppDispatch } from "../../store/store";
import { DialogEntity, Persona, SupportedLanguage } from "./models";
import "./PersonaPage.css";

function PersonaPage() {
    const dispatch = useDispatch<AppDispatch>();
    const personas = useSelector(selectPersonas);
    const languages = useSelector(selectLanguages);

    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>({ _id: -1, language: "multilingual" });

    const selectedPersona = useSelector(selectSelectedPersona);
    const form = useSelector(selectForm);
    const descriptionForm = useSelector(selectDescriptionForm);
    const dialogForm = useSelector(selectDialogForm);
    const languageForm = useSelector(selectLanguageForm);
    const disabled = useSelector(selectDisabledStatus);

    useEffect(() => {
        dispatch(getPersonas());
        dispatch(getInfo());
    }, []);

    useEffect(() => {
        dispatch(setForm(selectedPersona));
    }, [selectedPersona]);

    function projectPersona(persona: Persona): string {
        if (persona) {
            return persona.description.case;
        }
        return "";
    }

    function handleSelectedPersona(persona: Persona) {
        dispatch(setSelectedPersona(persona));

        const language = languages.find((l: SupportedLanguage) => projectLanguage(l).toLowerCase() === persona.language.toLowerCase());
        setSelectedLanguage(language);
    }

    function projectLanguage(language: SupportedLanguage): string {
        if (language) {
            return language.language;
        }
        return "";
    }

    function handleSelectedLanguage(language: SupportedLanguage) {
        setSelectedLanguage(language);
    }

    function filterPersonasAfterLanguage(personas: Array<Persona>): Array<Persona> {
        if (projectLanguage(selectedLanguage).toLowerCase() === "multilingual") {
            return personas;
        }
        const pattern = new RegExp(projectLanguage(selectedLanguage), "i");
        return personas.filter((persona: Persona) => pattern.test(persona.language));
    }

    function handleDescriptionFormChange(descriptionForm: any) {
        dispatch(setDescriptionForm(descriptionForm));
    }

    function handleDialogFormChange(dialogForm: Array<DialogEntity>) {
        dispatch(setDialogForm(dialogForm));
    }

    function handleLanguageFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setLanguageForm(e.target.value));
    }

    function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
        dispatch(setDisabled(false));
    }

    function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        if (form["_id"]["$oid"]) {
            axios({
                method: "post",
                url: `${BASE_URL}/personas/persona/update`,
                withCredentials: true,
                data: form
            }).then((response) => {
                dispatch(updatePersona(form));
                dispatch(setDisabled(true));
            }).catch((error) => console.error(error));
        } else {
            axios({
                method: "post",
                url: `${BASE_URL}/personas/persona/insert`,
                withCredentials: true,
                data: form
            }).then((response) => {
                dispatch(addPersona(response.data));
                dispatch(setDisabled(true));
            }).catch((error) => console.error(error));
        }
    }

    function handleAddNewPersona(e: React.MouseEvent<HTMLButtonElement>) {
        const newPersona: Persona = {
            _id: {"$oid": ""},
            description: {
                "case": "",
                "age": "",
                "sex": ""
            },
            dialog: [
                {
                    "questions": [""],
                    "answers": [""],
                    "label": "visit_reason"
                }
            ],
            language: "en"
        }
        dispatch(setForm(newPersona));
        dispatch(setDisabled(false));
    }

    function handleDiscard(e: React.MouseEvent<HTMLButtonElement>) {
        dispatch(setDisabled(true));
        dispatch(setForm(selectedPersona));
    }

    return (
        <div className="persona-page">
            <div className="persona-filter-menu">
                <div className="persona-filter">
                    <InputFilter elements={filterPersonasAfterLanguage(personas)}
                        project={projectPersona}
                        selectedElement={selectedPersona}
                        handleSelectedElement={handleSelectedPersona}
                        placeholder={"Type to filter"}
                        disabled={!disabled} />
                </div>
                <div className="language-filter">
                    <InputFilter elements={languages}
                        project={projectLanguage}
                        selectedElement={selectedLanguage}
                        handleSelectedElement={handleSelectedLanguage}
                        placeholder={"Languge"}
                        disabled={!disabled} />
                </div>
                <button className="btn"
                    onClick={handleAddNewPersona}
                    disabled={!disabled}>New Persona</button>
            </div>
            {form && <div className="persona-edit-menu">
                <button className="btn"
                    onClick={handleEdit}
                    disabled={!disabled}>Edit</button>
                <button className="btn"
                    onClick={handleSave}
                    disabled={disabled}>Save</button>
                <button className="btn"
                    onClick={handleDiscard}
                    disabled={disabled}>Discard</button>
            </div>}
            {form && <div className="persona-form-main-container">
                <PersonaDescriptionForm
                    disabled={disabled}
                    title="Description"
                    description={descriptionForm}
                    handleFormChange={handleDescriptionFormChange} />
                <PersonaDialogForm
                    disabled={disabled}
                    title="Dialog"
                    dialog={dialogForm}
                    handleFormChange={handleDialogFormChange} />
                <div className="persona-language-form">
                    <label>Persona language:</label>
                    <select
                        value={languageForm}
                        onChange={handleLanguageFormChange}
                        disabled={disabled}>
                        {languages
                            .filter((language: SupportedLanguage) => language.language.toLowerCase() !== "multilingual")
                            .map((language: SupportedLanguage, i: number) => <option value={language.language}
                            key={`${language.language}-${i}`}>
                            {language.language}
                        </option>)}
                    </select>
                </div>
            </div>}
        </div>
    );
}

export default PersonaPage;