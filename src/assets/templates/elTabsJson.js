import tabs from '../svg/tabs.svg'

export default () => {
    return {
        "componentName": "ElTabs",
        "text": "标签页",
        "icon": tabs,
        noUseForm: true,
        props: {
            type: "border-card",
            // 'current-name': '1'
        },
        "children": [
            {
                "componentName": "ElTabPane",
                "props": {
                    "label": "标签",
                    "name": "1"
                },
                children: []
            },
            // {
            //     "componentName": "ElTabPane",
            //     "props": {
            //         "label": "标签",
            //         "name": "2"
            //     },
            //     children: []
            // }
        ]
    }
}
