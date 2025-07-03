import modules from './imports';

// 排除文件
const exclude = ['index.js', 'imports.js']

const templateJson = modules(exclude)

export default [
    {title: '容器组件'},
    templateJson.elCard(),
    templateJson.elTabsJson(),
    {title: '基础组件'},
    templateJson.elTableJson(),
    templateJson.elButtonJson(),
    templateJson.elCheckboxJson(),
    templateJson.elRadioJson(),
    templateJson.elInputJson(),
    templateJson.elSelectJson(),
    templateJson.elDatePickerJson(),
    templateJson.elSwitchJson()
]
