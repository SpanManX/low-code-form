import table from '../svg/table.svg'

export default () => {
    return {
        "componentName": "ElTable",
        "text": "表格",
        "icon": table,
        noUseForm:true,
        "props": {
            "border": true,
            "stripe": true
        },
        "children": [
            {
                "componentName": "ElTableColumn",
                "props": {
                    "prop": "date",
                    "label": "日期",
                    "width": "180"
                }
            },
            {
                "componentName": "ElTableColumn",
                "props": {
                    "prop": "name",
                    "label": "姓名",
                    "width": "180"
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
