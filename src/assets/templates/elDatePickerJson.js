import datePicker from '../svg/datePicker.svg' // 假设你有一个对应的日期选择器 SVG 图标

export default () => {
    return {
        "componentName": "ElDatePicker",
        "text": "日期选择器",
        "icon": datePicker,
        "props": {
            "type": "date", // 日期选择器的类型，可以是 'date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'
            "placeholder": "选择日期",
            // "format": "yyyy-MM-dd", // 日期格式
            // "value-format": "YYYY-MM-DD", // 绑定值的格式
            // "clearable": true, // 是否显示清除按钮
            // "readonly": false, // 完全只读，开启后不会弹出选择器
            // "disabled": false, // 禁用选择器
            // "popper-class": "my-datepicker", // 弹出框的自定义类名
            // "picker-options": {
            //     "disabledDate": (time) => {
            //         return time.getTime() > Date.now(); // 禁用未来日期
            //     },
            //     "shortcuts": [{
            //         "text": "今天",
            //         "onClick": (picker) => {
            //             picker.$emit('pick', new Date());
            //         }
            //     }, {
            //         "text": "昨天",
            //         "onClick": (picker) => {
            //             const end = new Date();
            //             const start = new Date();
            //             start.setTime(start.getTime() - 3600 * 1000 * 24);
            //             picker.$emit('pick', [start, end]);
            //         }
            //     }, {
            //         "text": "一周前",
            //         "onClick": (picker) => {
            //             const end = new Date();
            //             const start = new Date();
            //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            //             picker.$emit('pick', [start, end]);
            //         }
            //     }]
            // }
        },
        // "events": {
        //     "change": "handleDateChange" // 绑定的事件处理函数
        // }
    }
}
