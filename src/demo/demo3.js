export default {
    "formOptions": {},
    forms:[
        {
            "componentName": "ElButton",
            "icon": {},
            "noUseForm": true,
            "label": "按钮",
            "text": "按钮",
            "props": {
                "type": "primary"
            },
            "id": "1751601548076366"
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "单选框",
                "prop": "field1751601548733801"
            },
            "on": {},
            "id": "1751601548910646",
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
                            "id": "1751601548910160",
                            "parentId": "1751601548733801"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 2",
                                "value": 2
                            },
                            "id": "1751601548910461",
                            "parentId": "1751601548733801"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 3",
                                "value": 3
                            },
                            "id": "175160154891036",
                            "parentId": "1751601548733801"
                        }
                    ],
                    "id": "1751601548733801"
                }
            ]
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "选择器",
                "prop": "field1751601549539338"
            },
            "on": {},
            "id": "1751601549717895",
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
                            "id": "1751601549717110",
                            "parentId": "1751601549539338"
                        },
                        {
                            "componentName": "ElOption",
                            "props": {
                                "label": "Second Option",
                                "value": "val2"
                            },
                            "id": "1751601549717786",
                            "parentId": "1751601549539338"
                        }
                    ],
                    "id": "1751601549539338"
                }
            ]
        },
        {
            "componentName": "ElCard",
            "text": "卡片",
            "icon": {},
            "noUseForm": true,
            "props": {
                "label": "修改标题",
                "shadow": "hover"
            },
            "staticChildren": [
                {
                    "componentName": "div",
                    "slot": "header",
                    "props": {
                        "class": "card-header"
                    },
                    "label": "修改标题"
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
                                        "label": "选择器",
                                        "prop": "field1751601554125478"
                                    },
                                    "on": {},
                                    "id": "1751601554360612",
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
                                                    "id": "1751601554360996",
                                                    "parentId": "1751601554125478"
                                                },
                                                {
                                                    "componentName": "ElOption",
                                                    "props": {
                                                        "label": "Second Option",
                                                        "value": "val2"
                                                    },
                                                    "id": "1751601554360928",
                                                    "parentId": "1751601554125478"
                                                }
                                            ],
                                            "id": "1751601554125478"
                                        }
                                    ]
                                }
                            ],
                            "id": "1751601551701800",
                            "parentId": "1751601550861641"
                        },
                        {
                            "componentName": "ElTabPane",
                            "id": "175160155338891",
                            "parentId": "1751601550861641",
                            "props": {
                                "label": "New Option",
                                "name": 1751601553388
                            },
                            "children": [
                                {
                                    "componentName": "ElCard",
                                    "text": "卡片",
                                    "icon": {},
                                    "noUseForm": true,
                                    "props": {
                                        "label": "卡片标题"
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
                                                "label": "开关",
                                                "prop": "field1751601557142125"
                                            },
                                            "on": {},
                                            "id": "175160155752678",
                                            "children": [
                                                {
                                                    "componentName": "ElSwitch",
                                                    "icon": {},
                                                    "text": "开关",
                                                    "props": {
                                                        "active-text": "开",
                                                        "inactive-text": "关"
                                                    },
                                                    "id": "1751601557142125"
                                                }
                                            ]
                                        }
                                    ],
                                    "id": "1751601555980158"
                                }
                            ]
                        }
                    ],
                    "id": "1751601550861641"
                }
            ],
            "id": "175160155018071"
        }
    ]
}
