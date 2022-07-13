export interface DialogEntity {
    label: string,
    questions: Array<string>,
    answers: Array<string>
}

export interface Persona {
    _id: any,
    description: any,
    dialog: Array<DialogEntity>,
    language: "en" | "ro"
}

export interface SupportedLanguage {
    _id: any,
    language: string
}