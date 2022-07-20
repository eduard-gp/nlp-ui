import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BASE_URL } from "../../config/config";
import { getInfo, selectLanguages } from "../../store/infoSlice";
import { AppDispatch } from "../../store/store";
import { SupportedLanguage } from "../PersonaPage/models";

import "./ExplorePage.css";

export interface ExploreInfo {
    utterance: string,
    intention: string,
    confidence: string
    ner_tags: Array<[string, string]>
}

function ExplorePage() {
    const [utterance, setUtterance] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [analyzedUtterances, setAnalyzedUtterances] = useState<Array<ExploreInfo>>([]);

    const dispatch = useDispatch<AppDispatch>();
    const languages = useSelector(selectLanguages);

    const nerTagsExplanations: any = {
        "ro": {
            "PERSON": "Persons, including fictive characters.",
            "NAT_REL_POL": "Nationalities, religious or political gropus.",
            "ORGANIZATION": "Companies, agencies, institutions, sports teams, groups of people.",
            "GPE": "Geo-political entities: countries, counties, cities, villages.",
            "LOC": "Non-geo-political locations: mountains, seas, lakes, streets, neighbourhoods, addresses, continents, regions that are not GPEs.",
            "FACILITY": "Buildings, airports, highways, bridges or other functional structures built by humans.",
            "PRODUCT": "Objects, cars, food and items.",
            "EVENT": "Storms, battles, wars, sports events, etc.",
            "LANGUAGE": "All languages.",
            "WORK_OF_ART": "Books, songs, TV shows and pictures.",
            "DATETIME": "Date and time values.",
            "PERIOD": "Periods and time intervals.",
            "MONEY": "Money, monetary values, including units (eg. USD, $, RON, lei, pounds, Euro)",
            "QUANTITY": "Measurements such as weight, distance, etc.",
            "NUMERIC_VALUE": "Any numeric value which is not MONEY, QUANTITY or ORDINAL.",
            "ORDINAL": "The first, the second, last, 30th, etc.",
        },
        "en": {
            "LOC": "Locations",
            "MISC": "Miscelaneous names",
            "ORG": "Organizations",
            "PER": "Persons"
        }
    }

    useEffect(() => {
        dispatch(getInfo());
    }, []);

    useEffect(() => {
        if (languages.length > 0) {
            setSelectedLanguage(languages[0].language);
        }
    }, [languages]);

    useEffect(() => {
        const d = document.querySelector(".explore-info-container");
        if (d) {
            d.scrollTop = d.scrollHeight;
        }
    });

    function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios({
            method: "post",
            url: `${BASE_URL}/explore/analyze`,
            withCredentials: true,
            data: {
                language: selectedLanguage,
                utterance: utterance
            }
        }).then((res) => {
            setAnalyzedUtterances([...analyzedUtterances, res.data]);
            setUtterance("");
        }).catch((error) => console.error(error));
    }

    function handleUtteranceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUtterance(e.target.value);
    }

    function handleLanguageFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedLanguage(e.target.value);
    }

    function buildNerTagsExplanations(language: string) {
        const nerTags = nerTagsExplanations[language];
        const result = [];
        for (const nerTag in nerTags) {
            result.push(
                <li key={nerTag}>
                    <span>{nerTag}:</span> {nerTags[nerTag]}
                </li>
            );
        }
        return result;
    }

    function handleReset() {
        setAnalyzedUtterances([]);
    }

    return (
        <div>
            <form className="send-message-menu explore-menu" onSubmit={handleOnSubmit}>
                <input value={utterance}
                    onChange={handleUtteranceChange} />
                <select value={selectedLanguage}
                    onChange={handleLanguageFormChange}>
                    {languages
                        .filter((language: SupportedLanguage) => language.language !== "multilingual")
                        .map((language: SupportedLanguage, index: number) => (
                            <option value={language.language} key={index}>
                                {language.language}
                            </option>
                        ))}
                </select>
                <button className="btn">Send</button>
                <button className="btn" type="button" onClick={handleReset}>Reset</button>
            </form>
            <div className="explore-ner-tags-info">
                <h2>Named entity tagging</h2>
                <p>Words tagged with O are outside of named entities. B-XXXX starts an entity of type XXXX 
                and I-XXXX is used for words inside a named entity of type XXXX.</p>
                <h3>Named entities</h3>
                <ul>
                    {buildNerTagsExplanations(selectedLanguage)}
                </ul>
            </div>
            <div className="explore-info-container">
                {analyzedUtterances.map((utterance: ExploreInfo, index: number) => (
                    <div className="explore-element" key={index}>
                        <div><span className="explore-element-label">Text:</span> {utterance.utterance}</div>
                        <div><span className="explore-element-label">Intention:</span> {utterance.intention}</div>
                        <div><span className="explore-element-label">Confidence:</span> {utterance.confidence}</div>
                        <div><span className="explore-element-label">NER:</span> 
                            {utterance.ner_tags.map((([token, label], i) => (
                                <span className="ner-group" key={`${index}-${i}`}>
                                    <span className="ner-element-token">{token}</span>
                                    <span className="ner-element-label">{label}</span>
                                </span>
                            )))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;