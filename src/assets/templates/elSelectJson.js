import select from '../svg/select.svg'

export default () => {
    return {
        "componentName": "ElSelect",
        "text": "选择器",
        "icon": select,
        "props": {
            "style": "min-width: 196px",
            placeholder: '请选择'
        },
        "children": [
            {
                "componentName": "ElOption",
                "props": {
                    "label": "First Option",
                    "value": "val1"
                }
            },
            {
                "componentName": "ElOption",
                "props": {
                    "label": "Second Option",
                    "value": "val2"
                }
            }
        ]
    }
}