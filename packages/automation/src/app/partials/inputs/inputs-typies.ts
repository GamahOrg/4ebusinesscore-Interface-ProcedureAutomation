

export enum FormElementsTypes {
    Input = 'input',
    Dropdown = 'select',
    Textareas = 'textareas'
}

export const formElements = {
    [FormElementsTypes.Input]: ["text", "radio", "checkbox", "date", "time", "datetime-local","file"],
    [FormElementsTypes.Dropdown]: ["select"],
    [FormElementsTypes.Textareas]: ["textarea"]
};

export enum LabelNameOfType {
    text = 'إجابه قصيره',
    radio = 'خيارات متعدده',
    checkbox = 'مربعات اختيار',
    file = 'مرفقات',
    date = 'التاريخ',
    time = 'الوقت',
    'datetime-local' = 'وقت وتاريخ',
    select = 'القائمه المنسدله',
    textarea = 'فقره',
    input="مدخلات",
    dropdown="قوائم منسدله",
    textareas="فقرات",
}

export class InputModel {
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    checked?: boolean;
    inputType?: string;
    options?:any[];

    constructor(
        id: string = '',
        name: string = '',
        value: string = '',
        label: string = '',
        placeholder: string = '',
        required: boolean = false,
        type: string = '',
        inputType:string='',
        checked:boolean=false,
        options:string[]=[]
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.label = label;
        this.placeholder = placeholder;
        this.required = required;
        this.type = type;
        this.inputType = inputType;
        this.checked = checked;
        this.options = options;
    }
}

