export default {
    "formOptions": {
        "labelWidth": null
    },
    "forms": [
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "上传组件",
                "prop": "field1752146439291349"
            },
            "id": "1752146439481725",
            "children": [
                {
                    "componentName": "ElUpload",
                    "text": "上传组件",
                    "icon": {},
                    "props": {
                        "action": "",
                        "name": "file",
                        "headers": {
                            "Authorization": "token"
                        },
                        "list-type": "picture-card"
                    },
                    "children": [
                        {
                            "componentName": "ElButton",
                            "label": "",
                            "props": {
                                "type": "primary",
                                "icon": "Plus",
                                "iconStyle": {
                                    "size": 50
                                },
                                "text": true
                            },
                            "id": "175214643948110",
                            "parentId": "1752146439291349"
                        },
                        {
                            "componentName": "template",
                            "slot": "tip",
                            "children": [
                                {
                                    "componentName": "div",
                                    "props": {
                                        "class": "el-upload__tip"
                                    },
                                    "label": "",
                                    "id": "1752146439481442",
                                    "parentId": "1752146439481249"
                                }
                            ],
                            "id": "1752146439481249",
                            "parentId": "1752146439291349"
                        }
                    ],
                    "id": "1752146439291349",
                    "parentId": null
                }
            ]
        }
    ]
}
