import React, { useEffect, useState } from "react";

import "./InputFilter.css";

function InputFilter({
    project,
    elements,
    selectedElement,
    handleSelectedElement,
    placeholder,
    disabled
}: {
    project: (elem: any) => string,
    elements: Array<any>,
    selectedElement: any,
    handleSelectedElement: (elem: any) => void,
    placeholder: string,
    disabled: boolean
}) {
    const [query, setQuery] = useState<string>(project(selectedElement));

    useEffect(() => {
        setQuery(project(selectedElement));
    }, [selectedElement]);

    function handleQueryFocus(e: React.FocusEvent<HTMLInputElement>) {
        const parent = e.target.parentElement;
        if (!parent) {
            return;
        }
        e.target.select();
        const dropdown = parent.querySelector(".dropdown")
        if (dropdown) {
            dropdown.classList.add("open");
        }
    }

    function handleQueryBlur(e: React.FocusEvent<HTMLInputElement>) {
        const parent = e.target.parentElement;
        if (!parent) {
            return;
        }
        const dropdown = parent.querySelector(".dropdown")
        if (dropdown) {
            dropdown.classList.remove("open");
        }
    }

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function filterElements(elements: Array<any>) {
        const pattern = new RegExp(query, "i");
        return elements.filter((element: any) => pattern.test(project(element)));
    }

    function handleClick(element: any) {
        setQuery(project(element));
        handleSelectedElement(element)
    }

    return (
        <form className="filter-input-form" onSubmit={(e) => e.preventDefault()}>
            <input
                placeholder={placeholder}
                value={query}
                onChange={handleQueryChange}
                onFocus={handleQueryFocus}
                onBlur={handleQueryBlur} 
                disabled={disabled}/>
            <ul className="dropdown">
                {filterElements(elements).map((element: any, index: number) => (
                    <li key={index}
                        onClick={() => {handleClick(element)}}>
                            {project(element)}
                    </li>
                ))}
            </ul>
        </form>
    );
}

export default InputFilter;