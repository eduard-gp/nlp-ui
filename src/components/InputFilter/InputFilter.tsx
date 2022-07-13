import React, { useEffect, useState } from "react";

import "./InputFilter.css";

function InputFilter({
    project,
    elements,
    selectedElement,
    handleSelectedElement,
    placeholder,
    // initialElement,
    disabled
}: {
    project: (elem: any) => string,
    elements: Array<any>,
    selectedElement: any,
    handleSelectedElement: (elem: any) => void,
    placeholder: string,
    // initialElement?: any,
    disabled: boolean
}) {
    // const [filteredElements, setFilterdElements] = useState<Array<any>>([]);
    const [query, setQuery] = useState<string>(project(selectedElement));

    useEffect(() => {
        setQuery(project(selectedElement));
    }, [selectedElement]);

    // useEffect(() => {
    //     const elems = [...elements].sort((element1: any, element2: any) => {
    //         const identifier1: string = project(element1).toLocaleLowerCase();
    //         const identifier2: string = project(element2).toLocaleLowerCase();
    //         return identifier1.localeCompare(identifier2);
    //     });
    //     setFilterdElements(elems);
    // }, [elements, project]);

    // useEffect(() => {
    //     if (initialElement) {
    //         setQuery(project(initialElement));
    //         handleSelectedElement(initialElement);
    //     }
    // }, [initialElement, project, handleSelectedElement]);

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
        // const pattern = new RegExp(e.target.value, "i");
        // const currFilteredElements = elements.filter((element: any) => pattern.test(project(element)));
        // currFilteredElements.sort((element1: any, element2: any) => {
        //     const identifier1: string = project(element1).toLocaleLowerCase();
        //     const identifier2: string = project(element2).toLocaleLowerCase();
        //     return identifier1.localeCompare(identifier2);
        // });
        // setFilterdElements(currFilteredElements);
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