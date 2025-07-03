export default [
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
                                "componentName": "ElFormItem",
                                "props": {
                                    "label": "单选框",
                                    "prop": "field1751465115959473"
                                },
                                "on": {},
                                "id": "1751465116444205",
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
                                                "id": "1751465116444222",
                                                "parentId": "1751465115959473"
                                            },
                                            {
                                                "componentName": "ElRadio",
                                                "props": {
                                                    "label": "Option 2",
                                                    "value": 2
                                                },
                                                "id": "1751465116444374",
                                                "parentId": "1751465115959473"
                                            },
                                            {
                                                "componentName": "ElRadio",
                                                "props": {
                                                    "label": "Option 3",
                                                    "value": 3
                                                },
                                                "id": "1751465116444767",
                                                "parentId": "1751465115959473"
                                            }
                                        ],
                                        "id": "1751465115959473"
                                    }
                                ]
                            }
                        ],
                        "id": "1751465115223298"
                    }
                ],
                "id": "1751465114881222",
                "parentId": "1751465114680645"
            }
        ],
        "id": "1751465114680645"
    }
]

// export default [
//     {
//         "componentName": "ElTabs",
//         "text": "标签页",
//         "icon": {},
//         "noUseForm": true,
//         "props": {
//             "type": "border-card"
//         },
//         "id": "1751187847991766",
//         "children": [
//             {
//                 "componentName": "ElTabPane",
//                 "props": {
//                     "label": "标签",
//                     "name": "1"
//                 },
//                 "children": [
//                     {
//                         "componentName": "ElCard",
//                         "text": "卡片",
//                         "icon": {},
//                         "noUseForm": true,
//                         "props": {},
//                         "id": "1751187848826117",
//                         "staticChildren": [
//                             {
//                                 "componentName": "template",
//                                 "slot": "header",
//                                 "staticChildren": [
//                                     {
//                                         "componentName": "div",
//                                         "props": {
//                                             "class": "card-header"
//                                         },
//                                         "label": "卡片"
//                                     }
//                                 ]
//                             }
//                         ],
//                         "children": [
//                             {
//                                 "componentName": "ElFormItem",
//                                 "props": {
//                                     "label": "单选框",
//                                     "prop": "field1751187850635562"
//                                 },
//                                 "on": {},
//                                 "children": [
//                                     {
//                                         "componentName": "ElRadioGroup",
//                                         "text": "单选框",
//                                         "icon": {},
//                                         "props": {},
//                                         "children": [
//                                             {
//                                                 "componentName": "ElRadio",
//                                                 "props": {
//                                                     "label": "Option 1",
//                                                     "value": 1
//                                                 },
//                                                 "id": "1751187851028601",
//                                                 "parentId": "1751187850635562"
//                                             },
//                                             {
//                                                 "componentName": "ElRadio",
//                                                 "props": {
//                                                     "label": "Option 2",
//                                                     "value": 2
//                                                 },
//                                                 "id": "1751187851028466",
//                                                 "parentId": "1751187850635562"
//                                             },
//                                             {
//                                                 "componentName": "ElRadio",
//                                                 "props": {
//                                                     "label": "Option 3",
//                                                     "value": 3
//                                                 },
//                                                 "id": "1751187851028345",
//                                                 "parentId": "1751187850635562"
//                                             }
//                                         ],
//                                         "id": "1751187850635562"
//                                     }
//                                 ]
//                             }
//                         ],
//                     }
//                 ],
//                 "id": "1751187848148336",
//                 "parentId": "1751187847991766"
//             }
//         ],
//     }
// ]
