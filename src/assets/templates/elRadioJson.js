import radio from '../svg/radio.svg'

export default () => {
    return {
        "componentName": "ElRadioGroup",
        text: '单选框',
        icon: radio,
        props: {},
        "children": [
            {
                "componentName": "ElRadio",
                "props": {
                    "label": "Option 1",
                    value: 1
                },
            },
            {
                "componentName": "ElRadio",
                "props": {
                    "label": "Option 2",
                    value: 2
                },
            },
            {
                "componentName": "ElRadio",
                "props": {
                    "label": "Option 3",
                    value: 3
                },
            }
        ]
    }
}
