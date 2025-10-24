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

// 卡片
export const ElCardConfigProps = [
    {key: 'label', value: '', name: '标题'},
    {key: 'shadow', values: ['always', 'hover', 'never'], name: '卡片阴影'},
];

// grid
export const GridComponentConfigProps = [
    // {key: 'rows', value: 1, name: '行数'},
    {key: 'columns', value: 1, name: '列数'},
    {key: 'gap', value: 0, name: '间距'},
];

// div
export const DivComponentConfigProps = [
    {key: 'textAlign', values: ['left', 'right', 'center'], name: '位置'},
    {key: 'padding', value: '', name: '内边距', tip: '例如：10px 或 10px 20px 或 10px 20px 30px 40px'},
];

// button
export const ElButtonConfigProps = [
    {key: 'label', value: '', name: '按钮文字'},
    {key: 'type', values: ['primary', 'success', 'info', 'warning', 'danger'], name: '类型'},
    {key: 'round', value: false, name: '圆角按钮', tip: '仅在“按钮文字”不为“文字按钮”时有效'},
    {key: 'plain', value: false, name: '朴素按钮', tip: '仅在“按钮文字”不为“文字按钮”时有效'},
    {key: 'text', value: false, name: '文字按钮'},
];

// 分割线
export const ElDividerConfigProps = [
    {key: 'label', value: '', name: '文字内容'},
    {key: 'direction', values: ['horizontal', 'vertical'], name: '分割线方向'},
    {key: 'border-style', values: ['none', 'solid', 'dashed'], name: '分隔符样式'},
    {key: 'content-position', values: ['left', 'right', 'center'], name: '内容位置'},
];

// upload
export const ElUploadConfigProps = [
    {key: 'label', value: '', name: '按钮文字'},
    {key: 'label', value: '', name: '提示内容'},
    {key: 'multiple', value: false, name: '是否多选'},
    {key: 'limit', value: 0, name: '限制上传数'},
    {key: 'accept', value: '', name: '文件类型', tip: '例如：.jpg,.jpeg,.png,.gif'},
    {key: 'list-type', values: ['text', 'picture-card', 'picture'], name: '列表类型'},
    {key: 'text', value: false, name: '文字按钮'},
    {key: 'fontSize', value: 0, name: '图标大小'},
    {key: 'color', value: '', name: '图标颜色',tip: '例如：#409EFF 或 red'},
];

// table
export const ElTableConfigProps = [
    {key: 'height', value: '', name: '高度(PX)'},
    {key: 'border', value: true, name: '边框'},
    {key: 'stripe', value: true, name: '斑马纹'},
    {key: 'show-header', value: true, name: '是否显示表头'},
]