import modules from './imports';

// 排除文件
const exclude = ['index.js', 'imports.js']

const templateJson = modules(exclude)

export default Object.values(templateJson).map(item => item)
