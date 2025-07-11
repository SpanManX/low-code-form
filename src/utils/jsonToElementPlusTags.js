import componentDataStore from "../store/componentData";
import formStore from "../store/form.js";

let formData = null
let propsMap = {}

export function toKebabCase(str) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // fooBar → foo-Bar
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // ABCFoo → ABC-Foo
        .toLowerCase(); // 全部转小写
}

/**
 * 生成标签字符串
 *
 * @param item 标签对象
 * @returns 生成的标签字符串
 */
function generateTag(item) {
    const isDiv = item.componentName === 'DivComponent' || item.componentName === 'GridComponent'
    const isElCard = item.componentName === 'ElCard'
    const isElRadioGroup = item.componentName === 'ElRadioGroup'
    const isElCheckboxGroup = item.componentName === 'ElCheckboxGroup'

    // 处理 props，拼接成字符串
    const propsString = Object.entries(item.props || {})
        .map(([key, value]) => {
            // 合并条件判断，减少代码重复
            if (
                (isDiv && (key === 'columns' || key === 'gap' || key === 'textAlign')) ||
                (isElCard && key === 'label') ||
                ((isElRadioGroup || isElCheckboxGroup) && key === 'border') ||
                key === 'rules' || key === 'iconStyle'
            ) {
                return '';
            }
            let attrString = value
            let attrKey = key
            if (typeof value === 'object' && !Array.isArray(value)) {
                attrString = JSON.stringify(value).replace(/"/g, "'")
            } else if (Array.isArray(value)) {
                attrString = value.join(' ');
            }
            const attrPrefix = typeof value === 'boolean' || typeof value === 'number' || typeof value === 'object' || key === 'icon' ? ':' : '';

            return `${attrPrefix}${attrKey}="${attrString}"`;
        })
        .join(' ');

    let onString = ''
    if (item.on && item.componentName !== 'ElFormItem') {
        onString = Object.entries(item.on || {})
            .map(([key, value]) => `@${key}="${value}"`)
            .join(' ')
    }

    let slotString = ''
    if (item.slot) {
        slotString = `#${item.slot}`
    }

    // 处理 v-model，Element Plus 需要使用 v-model 绑定数据
    let vModelString = ''
    if (typeof formData.value[`field${item.id}`] !== 'undefined') {
        if (item.componentName === 'ElUpload') {
            vModelString = `v-model:file-list="formData.field${item.id}"`
        } else {
            vModelString = `v-model="formData.field${item.id}"`
        }
    } else if (item.model) {
        vModelString = `:model="${item.model}"`
    }

    // 递归处理 children
    const staticChildrenStr = (item.staticChildren || []).map((child) => generateTag(child)).join('\n')
    const childrenString = (item.children || []).map((child) => generateTag(child)).join('\n')

    // 合并所有子元素字符串
    const allChildrenStr = [staticChildrenStr, childrenString].filter(Boolean).join('\n')

    // 处理组件名称，如果是 Element Plus 组件则替换为 el- 开头的形式
    let componentName = item.componentName

    if (item.componentName.indexOf("El") > -1) {
        componentName = toKebabCase(item.componentName);
    } else if (item.componentName === 'DivComponent' || item.componentName === 'GridComponent') {
        componentName = 'div'
    }

    // 生成最终的标签字符串
    if (componentName) {
        if (allChildrenStr) {
            return `<${componentName} ${vModelString} ${propsString} ${onString} ${slotString}>\n${allChildrenStr}\n</${componentName}>`
        } else if (item.label) {
            return `<${componentName} ${vModelString} ${propsString} ${onString} ${slotString}>\n${item.label}\n</${componentName}>`
        } else {
            return `<${componentName} ${vModelString} ${propsString} ${onString}/>`
        }
    } else if (item.text) {
        return item.text
    }
}

/**
 * 将 JSON 数据转换为 Element Plus 组件标签
 *
 * @param {Object} jsonData - 包含 Element Plus 组件配置的 JSON 数据
 * @returns {string} - 转换后的 Element Plus 组件标签字符串
 */
export function jsonToElementPlusTags(jsonData) {
    formData = formStore.formData
    propsMap = JSON.parse(JSON.stringify(componentDataStore.componentDataMap))
    const treeJSON = JSON.parse(JSON.stringify(jsonData))

    return treeJSON.map((item) => {
        return generateTag(item)
    }).join('\n')
}
