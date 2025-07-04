// 下拉选择框
export const ElSelectConfigProps = [
    {key: 'placeholder', value: '请选择', name: '占位文本'},
    {key: 'clearable', value: false, name: '清除按钮'},
    {key: 'multiple', value: false, name: '是否多选'},
    {key: 'multiple-limit', value: 0, name: '可选项目数'},
    {key: 'collapse-tags', value: false, name: '超出合并'},
    {key: 'filterable', value: false, name: '是否可筛选'},
];

// 输入框
export const ElInputConfigProps = [
    {key: 'type', values: ['text', 'textarea', 'password'], name: '类型：'},
    {key: 'placeholder', value: '请输入内容', name: '占位文本'},
    {key: 'show-password', value: false, name: '密码可见'},
    {key: 'maxlength', value: 0, name: '长度限制'},
    {key: 'show-word-limit', value: false, name: '显示字数'},
    {key: 'clearable', value: false, name: '清除按钮'},
];

// 单选框
export const ElRadioGroupConfigProps = [
    {key: 'border', value: false, name: '显示边框'},
];

// 多选框
export const ElCheckboxGroupConfigProps = [
    {key: 'border', value: false, name: '显示边框'},
];

// 日期选择器
export const ElDatePickerConfigProps = [
    {key: 'type', values: ['date', 'datetime', 'year', 'month', 'daterange', 'datetimerange'], name: '日期类型'},
    {key: 'placeholder', value: '请选择日期', name: '占位文本'},
    {key: 'unlink-panels', value: false, name: '取消面板联动'},
    {key: 'range-separator', value: '-', name: '分隔符'},
    {
        key: 'value-format',
        values: ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', 'YYYY/MM/DD', 'YYYY/MM/DD HH:mm:ss'],
        name: '返回格式',
        clearable: true
    },
    {
        key: 'format',
        values: ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', 'YYYY/MM/DD', 'YYYY/MM/DD HH:mm:ss'],
        name: '显示格式',
        clearable: true
    },
    {key: 'clearable', value: true, name: '清除按钮'},
];

// 开关
export const ElSwitchConfigProps = [
    {key: 'inline-prompt', value: false, name: '显示在点内'},
    {key: 'active-text', value: '', name: 'on 文字描述'},
    {key: 'inactive-text', value: '', name: 'off 文字描述'},
];

// grid
export const GridComponentConfigProps = [
    {key: 'rows', value: 1, name: '行数'},
    {key: 'columns', value: 1, name: '列数'},
];
