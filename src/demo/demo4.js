export default [
    {
        "componentName": "GridComponent",
        "icon": {},
        "noUseForm": true,
        "text": "栅格",
        "props": {
            "class": "grid",
            "columns": 2,
            "gap": 20
        },
        "children": [
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "日期选择器",
                    "prop": "field1751794508710833"
                },
                "on": {},
                "id": "1751794509764283",
                "children": [
                    {
                        "componentName": "ElDatePicker",
                        "text": "日期选择器",
                        "icon": {},
                        "props": {
                            "type": "date",
                            "placeholder": "选择日期"
                        },
                        "id": "1751794508710833"
                    }
                ]
            },
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "选择器",
                    "prop": "field1751794507014377"
                },
                "on": {},
                "id": "1751794507740367",
                "children": [
                    {
                        "componentName": "ElSelect",
                        "text": "选择器",
                        "icon": {},
                        "props": {
                            "style": "min-width: 196px",
                            "placeholder": "请选择"
                        },
                        "children": [
                            {
                                "componentName": "ElOption",
                                "props": {
                                    "label": "First Option",
                                    "value": "val1"
                                },
                                "id": "175179450773958",
                                "parentId": "1751794507014377"
                            },
                            {
                                "componentName": "ElOption",
                                "props": {
                                    "label": "Second Option",
                                    "value": "val2"
                                },
                                "id": "175179450773915",
                                "parentId": "1751794507014377"
                            }
                        ],
                        "id": "1751794507014377"
                    }
                ]
            },
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "复选框",
                    "prop": "field175179451784489"
                },
                "on": {},
                "id": "1751794519335280",
                "children": [
                    {
                        "componentName": "ElCheckboxGroup",
                        "text": "复选框",
                        "icon": {},
                        "props": {},
                        "children": [
                            {
                                "componentName": "ElCheckbox",
                                "props": {
                                    "label": "Option A",
                                    "value": "ValueA"
                                },
                                "id": "1751794519335853",
                                "parentId": "175179451784489"
                            },
                            {
                                "componentName": "ElCheckbox",
                                "props": {
                                    "label": "Option B",
                                    "value": "ValueB"
                                },
                                "id": "1751794519335722",
                                "parentId": "175179451784489"
                            }
                        ],
                        "id": "175179451784489"
                    }
                ]
            },
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "单选框",
                    "prop": "field1751794519830222"
                },
                "on": {},
                "id": "1751794520805239",
                "children": [
                    {
                        "componentName": "ElRadioGroup",
                        "text": "单选框",
                        "icon": {},
                        "props": {},
                        "children": [
                            {
                                "componentName": "ElRadio",
                                "props": {
                                    "label": "Option 1",
                                    "value": 1
                                },
                                "id": "1751794520805629",
                                "parentId": "1751794519830222"
                            },
                            {
                                "componentName": "ElRadio",
                                "props": {
                                    "label": "Option 2",
                                    "value": 2
                                },
                                "id": "1751794520805815",
                                "parentId": "1751794519830222"
                            },
                            {
                                "componentName": "ElRadio",
                                "props": {
                                    "label": "Option 3",
                                    "value": 3
                                },
                                "id": "175179452080544",
                                "parentId": "1751794519830222"
                            }
                        ],
                        "id": "1751794519830222"
                    }
                ]
            }
        ],
        "id": "1751794504663543"
    },
    {
        "componentName": "ElCard",
        "text": "卡片",
        "icon": {},
        "noUseForm": true,
        "props": {
            "label": "卡片标题",
            "shadow": "hover"
        },
        "staticChildren": [
            {
                "componentName": "div",
                "slot": "header",
                "props": {
                    "class": "card-header"
                },
                "label": "卡片标题"
            }
        ],
        "children": [
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "卡片输入框",
                    "prop": "field1751794605972453"
                },
                "on": {},
                "id": "1751794606735468",
                "children": [
                    {
                        "componentName": "ElInput",
                        "icon": {},
                        "text": "输入框",
                        "props": {
                            "placeholder": "请输入内容"
                        },
                        "id": "1751794605972453"
                    }
                ]
            },
            {
                "componentName": "ElFormItem",
                "props": {
                    "label": "卡片输入框1",
                    "prop": "field1751794618375374"
                },
                "on": {},
                "id": "1751794619105472",
                "children": [
                    {
                        "componentName": "ElInput",
                        "icon": {},
                        "text": "输入框",
                        "props": {
                            "placeholder": "请输入内容",
                            "type": "textarea",
                            "maxlength": 150,
                            "show-word-limit": true
                        },
                        "id": "1751794618375374"
                    }
                ]
            }
        ],
        "id": "1751794577895824"
    },
    {
        "componentName": "DivComponent",
        "icon": {},
        "noUseForm": true,
        "text": "块元素",
        "props": {
            "class": "block-element",
            "text-align": "right"
        },
        "children": [
            {
                "componentName": "ElButton",
                "icon": {},
                "noUseForm": true,
                "label": "取消",
                "props": {
                    "type": "primary",
                    "label": "取消"
                },
                "id": "1751794527295796"
            },
            {
                "componentName": "ElButton",
                "icon": {},
                "noUseForm": true,
                "label": "确认",
                "props": {
                    "type": "success",
                    "label": "确认"
                },
                "id": "1751794528295234"
            }
        ],
        "id": "1751794524740450"
    }
]