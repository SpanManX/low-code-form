export default [
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
                        "label": "卡片"
                    }
                ]
            }
        ],
        "children": [
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
                                    "label": "输入框",
                                    "prop": "field1751465394990822",
                                    "rules": {
                                        "required": true,
                                        "message": "不能为空",
                                        "trigger": "blur"
                                    }
                                },
                                "on": {},
                                "id": "1751465395917975",
                                "children": [
                                    {
                                        "componentName": "ElInput",
                                        "icon": {},
                                        "text": "输入框",
                                        "props": {
                                            "placeholder": "请输入内容"
                                        },
                                        "id": "1751465394990822"
                                    }
                                ]
                            }
                        ],
                        "id": "1751465391591492",
                        "parentId": "1751465391229383"
                    },
                    {
                        "componentName": "ElTabPane",
                        "id": "1751465418320745",
                        "parentId": "1751465391229383",
                        "props": {
                            "label": "New Option123",
                            "name": "6666"
                        },
                        "children": []
                    }
                ],
                "id": "1751465391229383"
            }
        ],
        "id": "1751465390594418"
    },
    {
        "componentName": "ElFormItem",
        "props": {
            "label": "选择器",
            "prop": "field175146541238820"
        },
        "on": {},
        "id": "1751465412910245",
        "children": [
            {
                "componentName": "ElSelect",
                "text": "选择器",
                "icon": {},
                "props": {
                    "style": "min-width: 196px",
                    "placeholder": "请选择",
                    "clearable": true,
                    "multiple": true
                },
                "children": [
                    {
                        "componentName": "ElOption",
                        "props": {
                            "label": "First Option",
                            "value": "val1"
                        },
                        "id": "1751465412910271",
                        "parentId": "175146541238820"
                    },
                    {
                        "componentName": "ElOption",
                        "props": {
                            "label": "Second Option",
                            "value": "val2"
                        },
                        "id": "175146541291023",
                        "parentId": "175146541238820"
                    }
                ],
                "id": "175146541238820"
            }
        ]
    },
    {
        "componentName": "ElFormItem",
        "props": {
            "label": "开关",
            "prop": "field1751465413286682"
        },
        "on": {},
        "id": "1751465413818351",
        "children": [
            {
                "componentName": "ElSwitch",
                "icon": {},
                "text": "开关",
                "props": {
                    "active-text": "开",
                    "inactive-text": "关"
                },
                "id": "1751465413286682"
            }
        ]
    },
    {
        "componentName": "ElFormItem",
        "props": {
            "label": "复选框",
            "prop": "field1751465415041119"
        },
        "on": {},
        "id": "1751465415655443",
        "children": [
            {
                "componentName": "ElCheckboxGroup",
                "text": "复选框",
                "icon": {},
                "props": {
                    "border": true
                },
                "children": [
                    {
                        "componentName": "ElCheckbox",
                        "props": {
                            "label": "Option A",
                            "value": "ValueA",
                            "border": true
                        },
                        "id": "1751465415655479",
                        "parentId": "1751465415041119"
                    },
                    {
                        "componentName": "ElCheckbox",
                        "props": {
                            "label": "Option B",
                            "value": "ValueB",
                            "border": true
                        },
                        "id": "1751465415655253",
                        "parentId": "1751465415041119"
                    },
                    {
                        "componentName": "ElCheckbox",
                        "id": "1751465436240781",
                        "parentId": "1751465415655443",
                        "props": {
                            "label": "New Option",
                            "value": 1751465436239,
                            "border": true
                        }
                    }
                ],
                "id": "1751465415041119"
            }
        ]
    }
]

// export default [
//     {
//         "componentName": "ElCard",
//         "text": "卡片",
//         "icon": {},
//         "noUseForm": true,
//         "props": {},
//         "staticChildren": [
//             {
//                 "componentName": "template",
//                 "slot": "header",
//                 "staticChildren": [
//                     {
//                         "componentName": "div",
//                         "props": {
//                             "class": "card-header"
//                         },
//                         "label": "卡片"
//                     }
//                 ]
//             }
//         ],
//         "children": [
//             {
//                 "componentName": "ElTabs",
//                 "text": "标签页",
//                 "icon": {},
//                 "noUseForm": true,
//                 "props": {
//                     "type": "border-card"
//                 },
//                 "children": [
//                     {
//                         "componentName": "ElTabPane",
//                         "props": {
//                             "label": "标签",
//                             "name": "1"
//                         },
//                         "children": [
//                             {
//                                 "componentName": "ElInput",
//                                 "icon": {},
//                                 "text": "输入框",
//                                 "props": {
//                                     "placeholder": "请输入内容"
//                                 },
//                                 "id": "1751459827859360"
//                             }
//                         ],
//                         "id": "1751459818457763",
//                         "parentId": "1751459818059718"
//                     },
//                     {
//                         "componentName": "ElTabPane",
//                         "id": "1751459823713715",
//                         "parentId": "1751459818059718",
//                         "props": {
//                             "label": "New Option",
//                             "name": 1751459823713
//                         },
//                         "children": []
//                     }
//                 ],
//                 "id": "1751459818059718"
//             }
//         ],
//         "id": "1751459817246219"
//     },
//     {
//         "componentName": "ElSelect",
//         "text": "选择器",
//         "icon": {},
//         "props": {
//             "style": "min-width: 196px",
//             "placeholder": "请选择"
//         },
//         "children": [
//             {
//                 "componentName": "ElOption",
//                 "props": {
//                     "label": "First Option",
//                     "value": "val1"
//                 },
//                 "id": "17514598400297",
//                 "parentId": "1751459839551301"
//             },
//             {
//                 "componentName": "ElOption",
//                 "props": {
//                     "label": "Second Option",
//                     "value": "val2"
//                 },
//                 "id": "1751459840029898",
//                 "parentId": "1751459839551301"
//             }
//         ],
//         "id": "1751459839551301"
//     },
//     {
//         "componentName": "ElSwitch",
//         "icon": {},
//         "text": "开关",
//         "props": {
//             "active-text": "开",
//             "inactive-text": "关"
//         },
//         "id": "1751459845645647"
//     },
//     {
//         "componentName": "ElCheckboxGroup",
//         "text": "复选框",
//         "icon": {},
//         "props": {},
//         "children": [
//             {
//                 "componentName": "ElCheckbox",
//                 "props": {
//                     "label": "Option A",
//                     "value": "ValueA"
//                 },
//                 "id": "1751459852606296",
//                 "parentId": "1751459851919523"
//             },
//             {
//                 "componentName": "ElCheckbox",
//                 "props": {
//                     "label": "Option B",
//                     "value": "ValueB"
//                 },
//                 "id": "1751459852606107",
//                 "parentId": "1751459851919523"
//             }
//         ],
//         "id": "1751459851919523"
//     }
// ]
