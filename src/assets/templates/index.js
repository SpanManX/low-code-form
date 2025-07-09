import modules from './imports';

// 排除文件
const exclude = ['index.js', 'imports.js']

const templateJson = modules(exclude)

export default [
    {title: '容器组件'},
    templateJson.elCard(),
    templateJson.elTabsJson(),
    templateJson.gridJson(),
    templateJson.divJson(),
    {title: '基础组件'},
    templateJson.elTableJson(),
    templateJson.elButtonJson(),
    templateJson.elCheckboxJson(),
    templateJson.elRadioJson(),
    templateJson.elInputJson(),
    templateJson.elSelectJson(),
    templateJson.elDatePickerJson(),
    templateJson.elSwitchJson(),
    {title: '高级组件'},
    templateJson.elUploadJson(),
    {title: '其他'},
    templateJson.elDivider()
]
