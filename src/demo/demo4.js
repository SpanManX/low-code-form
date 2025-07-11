export default {
    "formOptions": {
        "labelWidth": null
    },
    "forms": [
        {
            "componentName": "GridComponent",
            "icon": {},
            "noUseForm": true,
            "text": "栅格",
            "props": {
                "class": "grid1752201480972420",
                "columns": 2,
                "gap": 20
            },
            "children": [
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "选择器",
                        "prop": "field1752201489982328"
                    },
                    "id": "1752201490736657",
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
                                    "id": "1752201490736975",
                                    "parentId": "1752201489982328"
                                },
                                {
                                    "componentName": "ElOption",
                                    "props": {
                                        "label": "Second Option",
                                        "value": "val2"
                                    },
                                    "id": "1752201490736176",
                                    "parentId": "1752201489982328"
                                }
                            ],
                            "id": "1752201489982328",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "输入框",
                        "prop": "field1752201487374140"
                    },
                    "id": "175220148808889",
                    "children": [
                        {
                            "componentName": "ElInput",
                            "icon": {},
                            "text": "输入框",
                            "props": {
                                "placeholder": "请输入内容"
                            },
                            "id": "1752201487374140",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "日期选择器",
                        "prop": "field1752201491742758"
                    },
                    "id": "1752201493043449",
                    "children": [
                        {
                            "componentName": "ElDatePicker",
                            "text": "日期选择器",
                            "icon": {},
                            "props": {
                                "type": "date",
                                "placeholder": "选择日期"
                            },
                            "id": "1752201491742758",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "复选框",
                        "prop": "field1752201494840175"
                    },
                    "id": "1752201495950978",
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
                                    "id": "1752201495950612",
                                    "parentId": "1752201494840175"
                                },
                                {
                                    "componentName": "ElCheckbox",
                                    "props": {
                                        "label": "Option B",
                                        "value": "ValueB"
                                    },
                                    "id": "1752201495950300",
                                    "parentId": "1752201494840175"
                                }
                            ],
                            "id": "1752201494840175",
                            "parentId": null
                        }
                    ]
                }
            ],
            "id": "1752201480972420",
            "parentId": null
        },
        {
            "componentName": "ElTabs",
            "text": "标签页",
            "icon": {},
            "noUseForm": true,
            "props": {
                "type": "border-card"
            },
            "children": [
                {
                    "componentName": "ElTabPane",
                    "props": {
                        "label": "标签",
                        "name": "1"
                    },
                    "children": [
                        {
                            "componentName": "ElFormItem",
                            "props": {
                                "label": "选择器",
                                "prop": "field1752201536455527"
                            },
                            "id": "1752201536928223",
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
                                            "id": "1752201536928455",
                                            "parentId": "1752201536455527"
                                        },
                                        {
                                            "componentName": "ElOption",
                                            "props": {
                                                "label": "Second Option",
                                                "value": "val2"
                                            },
                                            "id": "1752201536928604",
                                            "parentId": "1752201536455527"
                                        }
                                    ],
                                    "id": "1752201536455527",
                                    "parentId": null
                                }
                            ]
                        }
                    ],
                    "id": "1752201524230726",
                    "parentId": "17522015236982"
                },
                {
                    "componentName": "ElTabPane",
                    "id": "1752201527160270",
                    "parentId": "17522015236982",
                    "props": {
                        "label": "TEST",
                        "name": "123"
                    },
                    "children": [
                        {
                            "componentName": "ElFormItem",
                            "props": {
                                "label": "输入框",
                                "prop": "field1752201538123592"
                            },
                            "id": "1752201538562154",
                            "children": [
                                {
                                    "componentName": "ElInput",
                                    "icon": {},
                                    "text": "输入框",
                                    "props": {
                                        "placeholder": "请输入内容"
                                    },
                                    "id": "1752201538123592",
                                    "parentId": null
                                }
                            ]
                        }
                    ]
                }
            ],
            "id": "17522015236982",
            "parentId": null
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "单选框",
                "prop": "field1752201638695907"
            },
            "id": "1752201639930220",
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
                            "id": "1752201639930494",
                            "parentId": "1752201638695907"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 2",
                                "value": 2
                            },
                            "id": "1752201639930332",
                            "parentId": "1752201638695907"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 3",
                                "value": 3
                            },
                            "id": "1752201639930657",
                            "parentId": "1752201638695907"
                        }
                    ],
                    "id": "1752201638695907",
                    "parentId": null
                }
            ]
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "复选框123",
                "prop": "field1752201644707499"
            },
            "id": "1752201646164557",
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
                            "id": "1752201646164937",
                            "parentId": "1752201644707499"
                        },
                        {
                            "componentName": "ElCheckbox",
                            "props": {
                                "label": "Option B",
                                "value": "ValueB"
                            },
                            "id": "1752201646164366",
                            "parentId": "1752201644707499"
                        }
                    ],
                    "id": "1752201644707499",
                    "parentId": null
                }
            ]
        },
        {
            "componentName": "ElCard",
            "text": "卡片",
            "icon": {},
            "noUseForm": true,
            "props": {},
            "staticChildren": [
                {
                    "componentName": "template",
                    "slot": "header",
                    "staticChildren": [
                        {
                            "componentName": "div",
                            "props": {
                                "class": "card-header"
                            },
                            "label": "卡片标题"
                        }
                    ]
                }
            ],
            "children": [
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "开关",
                        "prop": "field1752201593926932"
                    },
                    "id": "175220159442351",
                    "children": [
                        {
                            "componentName": "ElSwitch",
                            "icon": {},
                            "text": "开关",
                            "props": {
                                "active-text": "开",
                                "inactive-text": "关"
                            },
                            "id": "1752201593926932",
                            "parentId": null
                        }
                    ]
                }
            ],
            "id": "1752201543887173",
            "parentId": null
        },
        {
            "componentName": "DivComponent",
            "icon": {},
            "noUseForm": true,
            "text": "块元素",
            "props": {
                "class": "block-element1752201597100485",
                "textAlign": "right"
            },
            "children": [
                {
                    "componentName": "ElButton",
                    "icon": {},
                    "noUseForm": true,
                    "label": "按钮",
                    "props": {
                        "type": "primary"
                    },
                    "id": "1752201613013561",
                    "parentId": null
                },
                {
                    "componentName": "ElButton",
                    "icon": {},
                    "noUseForm": true,
                    "label": "按钮",
                    "props": {
                        "type": "success"
                    },
                    "id": "1752201614921965",
                    "parentId": null
                }
            ],
            "id": "1752201597100485",
            "parentId": null
        }
    ]
}
