// import dialog from '../svg/dialog.svg'

export default () => {
    return {
        "componentName": "ElDialog",
        "text": "对话框",
        // "icon": dialog,
        "props": {
            "title": "提示",
            "visible": false,
            "width": "30%"
        },
        "children": [
            {
                "componentName": "ElButton",
                "props": {
                    "type": "primary",
                    "text": "确定",
                    "nativeType": "button",
                    "onClick": "dialogVisible = false"
                }
            },
            {
                "componentName": "ElButton",
                "props": {
                    "text": "取消",
                    "nativeType": "button",
                    "onClick": "dialogVisible = false"
                }
            }
        ]
    }
}
