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
