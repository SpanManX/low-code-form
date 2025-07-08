export default {
    "formOptions": {
        "labelPosition": "left",
        "labelWidth": 200,
        "inline": true
    },
    "forms": [
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "单选框",
                "prop": "field1751954722369928",
                "label-width": 100
            },
            "on": {},
            "id": "1751954722609537",
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
                            "id": "1751954722609518",
                            "parentId": "1751954722369928"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 2",
                                "value": 2
                            },
                            "id": "1751954722609249",
                            "parentId": "1751954722369928"
                        },
                        {
                            "componentName": "ElRadio",
                            "props": {
                                "label": "Option 3",
                                "value": 3
                            },
                            "id": "175195472260941",
                            "parentId": "1751954722369928"
                        }
                    ],
                    "id": "1751954722369928"
                }
            ]
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "选择器",
                "prop": "field1751954727190579"
            },
            "on": {},
            "id": "1751954727490353",
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
                            "id": "1751954727490632",
                            "parentId": "1751954727190579"
                        },
                        {
                            "componentName": "ElOption",
                            "props": {
                                "label": "Second Option",
                                "value": "val2"
                            },
                            "id": "1751954727490508",
                            "parentId": "1751954727190579"
                        }
                    ],
                    "id": "1751954727190579"
                }
            ]
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "输入框",
                "prop": "field1751954743959188"
            },
            "on": {},
            "id": "1751954744288925",
            "children": [
                {
                    "componentName": "ElInput",
                    "icon": {},
                    "text": "输入框",
                    "props": {
                        "placeholder": "请输入内容"
                    },
                    "id": "1751954743959188"
                }
            ]
        }
    ]
}
