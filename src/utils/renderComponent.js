import {h} from 'vue'
import * as ElementPlus from 'element-plus'
import DropItemComponent from "@/assets/templates/components/dropItemComponent.vue";
import DivComponent from "@/assets/templates/components/divComponent.vue";
import gridComponent from "@/assets/templates/components/gridComponent.vue";
import formStore from "../store/form.js";
import {noNeedBind, useWrappedNames} from "../store/names.js";
import {renderStaticChildren} from "./renderStaticChildren.js";
import componentDataStore from "@/store/componentData.js";

/**
 * 创建渲染器函数
 *
 * @returns 返回渲染组件的函数
 */
export function createRenderer(isPreview = false) {
    const formData = !isPreview ? formStore.formData : formStore.previewFormData // 表单数据（用于 v-model）
    const names = noNeedBind                                     // 不需要双向绑定的组件名列表
    const {labelWidth} = formStore.formOptions            // 表单 label 宽度

    /**
     * 渲染组件
     *
     * @param value 要渲染的组件数据
     *
     * @description 组件必须使用 key 属性，否则会导致组件无法正确更新
     * @returns 渲染后的组件对象
     */
    function renderComponent(value) {
        if (!value.parentId) {
            componentDataStore.SET_COMPONENT_DATA_MAP(value.id, value)
        }

        if (value.componentName === 'ElFormItem' && value.props.rules && !isPreview) {
            formStore.SET_FORM_RULES(`field${value.children[0].id}`, value.props.rules)
        }

        const funcKey = !isPreview ? 'SET_FORM_DATA' : 'SET_PREVIEW_FORM_DATA' // 用于区分是设置表单数据还是预览表单数据

        // value.id in formData.value 是 JavaScript 中的一个语法，用来判断一个对象是否包含某个属性
        if (names.indexOf(value.componentName) === -1 && !(`field${value.id}` in formData.value)) {
            // 会触发render更新
            if (value.componentName === 'ElTabs') {
                formStore[funcKey](`field${value.id}`, value.children[0].props.name || '')
            } else {
                formStore[funcKey](`field${value.id}`, value.componentName === 'ElCheckboxGroup' ? [] : '')
            }
        }

        const props = {...value.props}
        const events = value.on || {}

        if (formData && names.indexOf(value.componentName) === -1) {
            props.modelValue = formData.value[`field${value.id}`]
            props['onUpdate:modelValue'] = (val) => {
                console.log(funcKey)
                formStore[funcKey](`field${value.id}`, val)
            }
        }

        // 处理子节点
        let defaultData
        if (value.children) {
            defaultData = () => value.children.map(child => renderComponent(child))
        } else if (value.label) {
            defaultData = () => value.label
        }

        // 特殊处理
        if (value.componentName === 'ElTabPane') {
            props['data-id'] = value.id
        }

        const key = value.id

        // 特殊处理
        if (value.componentName === 'ElCard') {
            return h('div', {
                key: key,
                class: 'drop-item drop-item-card',
                'data-id': value.id,
                'data-component': value.componentName
            }, [h(ElementPlus[value.componentName], props, {
                default: defaultData, header: () => renderStaticChildren(value.staticChildren)
            })])
        }

        const componentName = value.componentName === 'ElFormItem' ? value.children?.[0]?.componentName : value.componentName

        if (value.componentName === 'GridComponent') {
            return h(DropItemComponent, {componentData: {...value, componentName}, key: key}, {
                default: () => h(gridComponent, {isPreview, ...value.props}, defaultData)
            })
        }


        let wrappedComponentChild;
        if (value.componentName === 'DivComponent') {
            wrappedComponentChild = {
                default: () => h(DivComponent, {isPreview, ...value.props}, defaultData)
            }
        } else {
            wrappedComponentChild = {
                default: () => h(ElementPlus[value.componentName], {
                    ...props, ...(labelWidth ? {'label-width': labelWidth || 'auto'} : {}), ...events
                }, defaultData)
            }
        }

        if (useWrappedNames.indexOf(value.componentName) > -1) {
            return h(DropItemComponent, {
                componentData: {...value, componentName},
                key: key
            }, wrappedComponentChild)
        } else {
            return h(ElementPlus[value.componentName], {...props, ...events}, defaultData)
        }
    }

    return renderComponent
}
