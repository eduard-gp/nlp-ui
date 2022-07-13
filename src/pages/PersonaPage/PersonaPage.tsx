import axios from "axios";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputFilter, PersonaDescriptionForm, PersonaDialogForm, VariableForm } from "../../components";
import { BASE_URL } from "../../config/config";
import { getInfo, selectLabels, selectLanguages } from "../../store/infoSlice";
import { selectDescriptionForm, selectDialogForm, selectDisabledStatus, selectForm, selectLanguageForm, selectSelectedPersona, setDescriptionForm, setDialogForm, setDisabled, setForm, setLanguageForm, setSelectedPersona } from "../../store/personaFormSlice";
import { addPersona, getPersonas, selectPersonas, updatePersona } from "../../store/personasSlice";
import { AppDispatch } from "../../store/store";
import { DialogEntity, Persona, SupportedLanguage } from "./models";
import "./PersonaPage.css";

// function PersonaPage() {
//     const [personas, setPersonas] = useState<Array<Persona>>([]);
//     const [filteredAfterLanguagePersonas, setFilteredAfterLanguagePersonas] = useState<Array<Persona>>([]);
//     const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
//     const [languages, setLanguages] = useState<Array<SupportedLanguage>>([]);
//     const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage | null>(null);
//     const [formState, setFormState] = useState<Persona | null>(null);
//     const [initialFormState, setInitialFormState] = useState<Persona | null>(null);
//     const [disabled, setDisabled] = useState<boolean>(true);

//     const dispatch = useDispatch<AppDispatch>();
//     const p = useSelector((state: any) => state.personas.personas);

//     useEffect(() => {
//         dispatch(getPersonas());
//     });

//     // useEffect(() => {
//     //     (async () => {
//     //         try {
//     //             const languagesPromise = axios({
//     //                 method: "get",
//     //                 url: `${BASE_URL}/info/languages`,
//     //                 withCredentials: true
//     //             });

//     //             const peronasPromise = axios({
//     //                 method: "get",
//     //                 url: `${BASE_URL}/personas`,
//     //                 withCredentials: true
//     //             });

//     //             const [responseLanguages, responsePersonas] = await Promise.all(
//     //                                                         [languagesPromise, peronasPromise]);
//     //             setLanguages(responseLanguages.data);
//     //             setPersonas(responsePersonas.data);
//     //             console.log(responsePersonas.data);
//     //         } catch (error) {
//     //             console.error(error);
//     //         }
//     //     })();
//     // }, [])

//     // useEffect(() => {
//     //     if (languages.length > 0) {
//     //         setCurrentLanguage(languages[0]);
//     //     }
//     // }, [languages]);

//     // useEffect(() => {
//     //     if (!currentLanguage) {
//     //         return;
//     //     }
//     //     setFilteredAfterLanguagePersonas(
//     //         personas.filter((persona: Persona) => persona.language.toLowerCase() === currentLanguage.language.toLowerCase())
//     //     );
//     // }, [currentLanguage, personas]);

//     function simpleDeepCopy(obj: any): any {
//         return JSON.parse(JSON.stringify(obj));
//     }

//     function projectPersona(persona: Persona): string {
//         return persona.description.case;
//     }

//     function handleSelectedPersona(persona: Persona) {
//         setCurrentPersona(persona);
//         setFormState(persona);
//         setInitialFormState(persona);
//     }

//     function projectLanguage(language: SupportedLanguage): string {
//         return language.language;
//     }

//     function handleSelectedLanguage(language: SupportedLanguage) {
//         setCurrentLanguage(language);
//     }

//     function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
//         setDisabled(false);
//     }

//     function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
//         console.log(formState);
//     }

//     function handleDiscard(e: React.MouseEvent<HTMLButtonElement>) {
//         setDisabled(true);
//         setCurrentPersona(initialFormState);
//         console.log("initial", initialFormState);
//     }

//     function handleDescriptionChange(descriptionForm: any) {
//         if (formState) {
//             const newFormState = simpleDeepCopy(formState);
//             newFormState["description"] = descriptionForm;
//             setFormState(newFormState);
//             console.log(newFormState);
//         }
//     }

//     function handleDialogChange(descriptionForm: any) {
//         if (formState) {
//             const newFormState = simpleDeepCopy(formState);
//             newFormState["dialog"] = descriptionForm;
//             setFormState(newFormState);
//             console.log(newFormState);
//         }
//     }

//     return (
//         <div>
//             {/* <div className="persona-filter-menu">
//                 <div className="persona-filter">
//                     <InputFilter elements={filteredAfterLanguagePersonas}
//                         project={projectPersona}
//                         handleSelectedElement={handleSelectedPersona}
//                         placeholder={"Type to filter"}
//                         disabled={false} />
//                 </div>
//                 <div className="language-filter">
//                     <InputFilter elements={languages}
//                         project={projectLanguage}
//                         handleSelectedElement={handleSelectedLanguage}
//                         placeholder={"Languge"}
//                         initialElement={currentLanguage}
//                         disabled={false} />
//                 </div>
//             </div>
//             <div className="persona-edit-menu">
//                 <button className="btn"
//                         onClick={handleEdit}>Edit</button>
//                 <button className="btn"
//                         onClick={handleSave}>Save</button>
//                 <button className="btn"
//                         onClick={handleDiscard}>Discard</button>
//             </div>
//             <div>
//                 <PersonaDescriptionForm
//                     disabled={disabled}
//                     title="Description"
//                     description={formState?.description}
//                     handleFormChange={handleDescriptionChange}/>
//                 <PersonaDialogForm
//                     disabled={disabled}
//                     title="Dialog"
//                     dialog={formState?.dialog}
//                     handleFormChange={handleDialogChange} />
//             </div> */}
//             {/* {JSON.stringify(currentPersona)} */}
//             {/* {JSON.stringify(p)} */}
//         </div>
//     );
// }

function PersonaPage() {
    // const [personas, setPersonas] = useState<Array<Persona>>([]);
    // const [filteredAfterLanguagePersonas, setFilteredAfterLanguagePersonas] = useState<Array<Persona>>([]);
    // const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
    // const [languages, setLanguages] = useState<Array<SupportedLanguage>>([]);
    // const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage | null>(null);
    // const [formState, setFormState] = useState<Persona | null>(null);
    // const [initialFormState, setInitialFormState] = useState<Persona | null>(null);
    // const [disabled, setDisabled] = useState<boolean>(true);

    const dispatch = useDispatch<AppDispatch>();
    const personas = useSelector(selectPersonas);
    const languages = useSelector(selectLanguages);
    // const labels = useSelector(selectLabels);
    const s = useSelector((state: any) => state);

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

    useEffect(() => {
        console.log(s);
    }, [s]);

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
        console.log(language);
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