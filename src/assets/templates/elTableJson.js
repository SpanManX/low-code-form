import table from '../svg/table.svg'

export default () => {
    return {
        "componentName": "ElTable",
        "text": "表格",
        "icon": table,
        noUseForm: true,
        "props": {
            "border": true,
            "stripe": true,
            "show-header": true,
            data: []
        },
        "children": [
            {
                "componentName": "ElTableColumn",
                "props": {
                    "prop": "date",
                    "label": "日期",
                }
            },
            {
                "componentName": "ElTableColumn",
                "props": {
                    "prop": "name",
                    "label": "姓名",
                }
            },
            {
                "componentName": "ElTableColumn",
                "props": {
                    "prop": "address",
                    "label": "地址"
                }
            }
        ]
    }
}