import datePicker from '../svg/datePicker.svg' // 假设你有一个对应的日期选择器 SVG 图标

export default () => {
    return {
        "componentName": "ElDatePicker",
        "text": "日期选择器",
        "icon": datePicker,
        "props": {
            "type": "date", // 日期选择器的类型，可以是 'date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'
            "placeholder": "选择日期",
        },
    }
}
