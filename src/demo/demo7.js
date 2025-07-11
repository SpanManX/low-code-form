export default {
    "formOptions": {
        "labelWidth": null
    },
    "forms": [
        {
            "componentName": "DivComponent",
            "icon": {},
            "noUseForm": true,
            "text": "块元素",
            "props": {
                "class": "block-element block-element1752214297519620",
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
                    "id": "1752214304261429",
                    "parentId": null
                }
            ],
            "id": "1752214297519620",
            "parentId": null
        },
        {
            "componentName": "DivComponent",
            "icon": {},
            "noUseForm": true,
            "text": "块元素",
            "props": {
                "class": "block-element block-element1752214298465425",
                "textAlign": "center"
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
                    "id": "1752214305457614",
                    "parentId": null
                }
            ],
            "id": "1752214298465425",
            "parentId": null
        },
        {
            "componentName": "GridComponent",
            "icon": {},
            "noUseForm": true,
            "text": "栅格",
            "props": {
                "class": "grid grid1752214299276595",
                "columns": 2,
                "gap": 10
            },
            "children": [
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "选择器",
                        "prop": "field1752214307646320"
                    },
                    "id": "1752214308185838",
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
                                    "id": "1752214308185287",
                                    "parentId": "1752214307646320"
                                },
                                {
                                    "componentName": "ElOption",
                                    "props": {
                                        "label": "Second Option",
                                        "value": "val2"
                                    },
                                    "id": "1752214308185896",
                                    "parentId": "1752214307646320"
                                },
                                {
                                    "componentName": "ElOption",
                                    "id": "175224434217712",
                                    "parentId": "1752214307646320",
                                    "props": {
                                        "label": "New Option",
                                        "value": 1752244342177
                                    }
                                }
                            ],
                            "id": "1752214307646320",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "单选框",
                        "prop": "field1752214306566359"
                    },
                    "id": "1752214307039888",
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
                                    "id": "1752214307039273",
                                    "parentId": "1752214306566359"
                                },
                                {
                                    "componentName": "ElRadio",
                                    "props": {
                                        "label": "Option 2",
                                        "value": 2
                                    },
                                    "id": "1752214307039414",
                                    "parentId": "1752214306566359"
                                },
                                {
                                    "componentName": "ElRadio",
                                    "props": {
                                        "label": "Option 3",
                                        "value": 3
                                    },
                                    "id": "1752214307039712",
                                    "parentId": "1752214306566359"
                                }
                            ],
                            "id": "1752214306566359",
                            "parentId": null
                        }
                    ]
                }
            ],
            "id": "1752214299276595",
            "parentId": null
        },
        {
            "componentName": "GridComponent",
            "icon": {},
            "noUseForm": true,
            "text": "栅格",
            "props": {
                "class": "grid grid175221430001446",
                "columns": 3,
                "gap": 20
            },
            "children": [
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "复选框",
                        "prop": "field1752214311914827"
                    },
                    "id": "175221431257065",
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
                                    "id": "1752214312570907",
                                    "parentId": "1752214311914827"
                                },
                                {
                                    "componentName": "ElCheckbox",
                                    "props": {
                                        "label": "Option B",
                                        "value": "ValueB"
                                    },
                                    "id": "1752214312570648",
                                    "parentId": "1752214311914827"
                                }
                            ],
                            "id": "1752214311914827",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "日期选择器",
                        "prop": "field1752214310595119"
                    },
                    "id": "1752214311199270",
                    "children": [
                        {
                            "componentName": "ElDatePicker",
                            "text": "日期选择器",
                            "icon": {},
                            "props": {
                                "type": "date",
                                "placeholder": "选择日期"
                            },
                            "id": "1752214310595119",
                            "parentId": null
                        }
                    ]
                },
                {
                    "componentName": "ElFormItem",
                    "props": {
                        "label": "输入框",
                        "prop": "field1752214308776432"
                    },
                    "id": "1752214309246293",
                    "children": [
                        {
                            "componentName": "ElInput",
                            "icon": {},
                            "text": "输入框",
                            "props": {
                                "placeholder": "请输入内容"
                            },
                            "id": "1752214308776432",
                            "parentId": null
                        }
                    ]
                }
            ],
            "id": "175221430001446",
            "parentId": null
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "上传组件",
                "prop": "field1752214314625551",
                "rules": {
                    "required": true,
                    "message": "不能为空",
                    "trigger": "change"
                }
            },
            "id": "1752214315058275",
            "children": [
                {
                    "componentName": "ElUpload",
                    "text": "上传组件",
                    "icon": {},
                    "props": {
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
                                    "fontSize": 50
                                },
                                "class": "upload1752214314625551",
                                "text": true
                            },
                            "id": "1752214315058474",
                            "parentId": "1752214314625551"
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
                                    "id": "1752214315058591",
                                    "parentId": "1752214315058874"
                                }
                            ],
                            "id": "1752214315058874",
                            "parentId": "1752214314625551"
                        }
                    ],
                    "id": "1752214314625551",
                    "parentId": null
                }
            ]
        },
        {
            "componentName": "ElFormItem",
            "props": {
                "label": "上传组件",
                "prop": "field1752214316464511"
            },
            "id": "175221431791830",
            "children": [
                {
                    "componentName": "ElUpload",
                    "text": "上传组件",
                    "icon": {},
                    "props": {},
                    "children": [
                        {
                            "componentName": "ElButton",
                            "label": "请选择文件",
                            "props": {
                                "type": "primary",
                                "icon": "Plus",
                                "iconStyle": {
                                    "fontSize": 18,
                                    "color": "red"
                                },
                                "class": "upload1752214316464511"
                            },
                            "id": "1752214317918568",
                            "parentId": "1752214316464511"
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
                                    "id": "1752214317918796",
                                    "parentId": "1752214317918110"
                                }
                            ],
                            "id": "1752214317918110",
                            "parentId": "1752214316464511"
                        }
                    ],
                    "id": "1752214316464511",
                    "parentId": null
                }
            ]
        }
    ]
}
