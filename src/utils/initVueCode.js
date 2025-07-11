import formStore from "@/store/form.js";
import divStylesStore from "@/store/divStyles.js";
import {jsonToElementPlusTags} from "@/utils/jsonToElementPlusTags.js";
import {html as beautifyHtml} from "js-beautify";
import {basicSetup, EditorView} from "codemirror";
import {vue} from "@codemirror/lang-vue";
import iconStore from "@/store/icon.js";

let vueView = null;

/**
 * 创建 Vue 代码
 *
 * 使用指定的参数美化 HTML 字符串，并将其设置为 Vue 编辑器的文档内容。
 * 如果 Vue 编辑器尚未创建，则创建新的编辑器并将其添加到指定的父容器中。
 * 如果 Vue 编辑器已存在，则更新其文档内容。
 */
export function initVueCode(list, templateRef) {
    const {labelPosition, labelWidth} = formStore.formOptions

    const labelPositionJoin = !labelPosition || (labelPosition === 'right' || labelPosition === '') ? '' : `label-position="${labelPosition}"`
    const labelWidthJoin = labelWidth === 'auto' || !labelWidth ? '' : `label-width="${labelWidth}"`
    const inlineJoin = formStore.formOptions.inline ? `:inline="${formStore.formOptions.inline}"` : ''

    let str = ''
    Object.keys(divStylesStore.styles).forEach((key) => {
        str += `.${key}${divStylesStore.styles[key]}`
    })

    let strImport = ''
    if (Object.keys(iconStore.icons).length) {
        const arr = Array.from(new Set(Object.values(iconStore.icons)))
        strImport = `import {${arr.join(',')}} from "@element-plus/icons-vue";`
    }

    const htmlStr = `<template>
<div>
    <el-form :model="formData" :rules="rules" ${inlineJoin} ${labelPositionJoin} ${labelWidthJoin}>
    ${(jsonToElementPlusTags(JSON.parse(JSON.stringify(list))))}
    </el-form>
</div>
</template>
<script setup>
  import {ref} from 'vue';
  ${strImport}  
  
  const rules = ${JSON.stringify(formStore.rules.value, null, 2)}
  const formData = ref(${JSON.stringify(formStore.formData.value, null, 2)})
<\/script>
<style scoped>
.el-tabs, .el-card, .el-table,.block-element {
    margin-bottom: 10px;
}

.el-button{
    width: fit-content;
}

${str}
</style>`

    const attrHtmlStr = beautifyHtml(htmlStr,
        {
            wrap_attributes: 'force-aligned', // 强制属性换行并对齐
            indent_size: 4,
            wrap_line_length: 50,
            end_with_newline: true,
        }
    )
    if (!vueView) {
        vueView = new EditorView({
            parent: templateRef.value,
            doc: attrHtmlStr,
            extensions: [basicSetup, vue()]
        })
    } else {
        vueView.dispatch({
            changes: {
                from: 0,
                to: vueView.state.doc.length,
                insert: attrHtmlStr
            }
        })
    }

    return vueView
}

/**
 * 销毁 Vue 视图实例
 *
 * 当需要销毁已经创建的 Vue 视图实例时，调用此函数。
 * 如果存在 vueView 实例，则调用其 destroy 方法销毁实例，并将 vueView 设置为 null。
 */
export function destroyVueCode() {
    if (vueView) {
        vueView.destroy()
        vueView = null
    }
}
