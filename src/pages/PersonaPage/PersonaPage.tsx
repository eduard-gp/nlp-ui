import axios from "axios";
import React, { useEffect, useState } from "react";
import { InputFilter, VariableForm } from "../../components";
import { BASE_URL } from "../../config/config";
import "./PersonaPage.css";

interface DialogEntity {
    _id: string,
    label: string,
    questions: Array<string>,
    answers: Array<string>
}

interface Persona {
    _id: any,
    description: any,
    dialog: Array<DialogEntity>,
    language: "en" | "ro"
}

interface SupportedLanguage {
    _id: string,
    language: string
}

function PersonaPage() {
    const [personas, setPersonas] = useState<Array<Persona>>([]);
    const [filteredAfterLanguagePersonas, setFilteredAfterLanguagePersonas] = useState<Array<Persona>>([]);
    const [currentPersona, setCurrentPersona] = useState<Persona | null>(null);
    const [languages, setLanguages] = useState<Array<SupportedLanguage>>([]);
    const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const languagesPromise = axios({
                    method: "get",
                    url: `${BASE_URL}/languages`,
                    withCredentials: true
                });

                const peronasPromise = axios({
                    method: "get",
                    url: `${BASE_URL}/personas`,
                    withCredentials: true
                });

                const [responseLanguages, responsePersonas] = await Promise.all([languagesPromise, peronasPromise]);
                setLanguages(responseLanguages.data);
                setPersonas(responsePersonas.data);
                console.log(responsePersonas.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [])

    useEffect(() => {
        if (languages.length > 0) {
            setCurrentLanguage(languages[0]);
            // setFilteredAfterLanguagePersonas(
            //     personas.filter((persona: Persona) => persona.language.toLowerCase() === languages[0].language.toLowerCase())
            // )
        }
    }, [languages]);

    useEffect(() => {
        if (!currentLanguage) {
            return;
        }
        setFilteredAfterLanguagePersonas(
            personas.filter((persona: Persona) => persona.language.toLowerCase() === currentLanguage.language.toLowerCase())
        );
    }, [currentLanguage, personas]);

    function projectPersona(persona: Persona): string {
        return persona.description.case;
    }

    function handleSelectedPersona(persona: Persona) {
        setCurrentPersona(persona);
    }

    function projectLanguage(language: SupportedLanguage): string {
        return language.language;
    }

    function handleSelectedLanguage(language: SupportedLanguage) {
        setCurrentLanguage(language);
    }


    return (
        <div>
            <div className="persona-filter-menu">
                <div className="persona-filter">
                    <InputFilter elements={filteredAfterLanguagePersonas}
                        project={projectPersona}
                        handleSelectedElement={handleSelectedPersona}
                        placeholder={"Type to filter"}
                        disabled={false} />
                </div>
                <div className="language-filter">
                    <InputFilter elements={languages}
                        project={projectLanguage}
                        handleSelectedElement={handleSelectedLanguage}
                        placeholder={"Languge"}
                        initialElement={currentLanguage}
                        disabled={false} />
                </div>
            </div>
            <div>
                <VariableForm
                    title="Description"
                    elements={currentPersona?.description}/>
                <VariableForm
                    title="Dialog"
                    elements={currentPersona?.dialog[0]}/>
            </div>
            {/* {JSON.stringify(currentPersona)} */}
        </div>
    );
}

export default PersonaPage;