import {h} from 'vue'
import * as ElementPlus from 'element-plus'
import divComponent from "@/assets/templates/divComponent.vue";
import formStore from "../store/form.js";
import namesStore from "../store/names.js";
import {renderStaticChildren} from "./renderStaticChildren.js";
import componentDataStore from "@/store/componentData.js";

/**
 * 创建渲染器函数
 *
 * @param options 配置项，默认值为空对象
 * @param options.isTemplate 是否为模板模式，默认值为 false
 * @returns 返回渲染组件的函数
 */
export function createRenderer(options = {}) {
    // const {isTemplate = false} = options

    const formData = formStore.formData  // 表单数据（用于 v-model），默认值为 null
    const names = namesStore                             // 不需要双向绑定的组件名列表，默认值为空数组
    const {labelWidth} = formStore.formOptions            // 表单 label 宽度，默认值为 null
    const saveId = new Set()
    const useWrappedNames = ['ElFormItem', 'ElTabs', 'ElButton', 'ElTable']

    /**
     * 渲染组件
     *
     * @param value 要渲染的组件数据
     *
     * @description 组件必须要使用 key 属性，否则会导致组件无法正确更新
     * @returns 渲染后的组件对象
     */
    function renderComponent(value) {
        if (!value.parentId) {
            componentDataStore.SET_COMPONENT_DATA_MAP(value.id, value)
        }

        if (value.componentName === 'ElFormItem' && value.props.rules) {
            formStore.SET_FORM_RULES(`field${value.children[0].id}`, value.props.rules)
        }
        // if (isTemplate) {
        //     const id = value.id
        //     if (!saveId.has(id) && !value.parentId) {
        //         saveId.add(id)
        //     }
        // }

        const props = {...value.props}
        const events = value.on || {}

        // value.id in formData.value 是 JavaScript 中的一个语法，用来判断一个对象是否包含某个属性
        if (names.indexOf(value.componentName) === -1 && !(`field${value.id}` in formData.value)) {
            // 会触发render更新
            if (value.componentName === 'ElTabs') {
                formStore.SET_FORM_DATA(`field${value.id}`,value.children[0].props.name || '')
                // formData.value[`field${value.id}`] = value.children[0].props.name || ''
            } else {
                formStore.SET_FORM_DATA(`field${value.id}`,value.componentName === 'ElCheckboxGroup' ? [] : '')
                // formData.value[`field${value.id}`] = value.componentName === 'ElCheckboxGroup' ? [] : ''
            }
        }

        if (formData && names.indexOf(value.componentName) === -1) {
            props.modelValue = formData.value[`field${value.id}`]
            props['onUpdate:modelValue'] = (val) => {
                // formData.value[`field${value.id}`] = val
                formStore.SET_FORM_DATA(`field${value.id}`, val)
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
        // 特殊处理
        if (value.componentName === 'ElCard') {
            return h('div', {
                key: value.id,
                class: 'drop-item drop-item-card', 'data-id': value.id, 'data-component': value.componentName
            }, [h(ElementPlus[value.componentName], props, {
                default: defaultData, header: () => renderStaticChildren(value.staticChildren)
            })])
        }

        const componentName = value.componentName === 'ElFormItem' ? value.children?.[0]?.componentName : value.componentName

        // const key = `${value.componentName}-${value.id}-${value.version || 0}`
        // console.log(key)
        const rawComponent = h(ElementPlus[value.componentName], {
            ...props,
            ...events
        }, defaultData)

        const wrappedComponent = h(divComponent, {componentData: {...value, componentName}, key: value.id}, {
            default: () => [h(ElementPlus[value.componentName], {
                ...props,
                ...(labelWidth ? {'label-width': labelWidth || 'auto'} : {}),
                ...events
            }, defaultData)]
        })
        // if (notDiv) {
        //     return rawComponent
        // }
        // if (!isTemplate) {
        return useWrappedNames.indexOf(value.componentName) > -1 ? wrappedComponent : rawComponent
        // } else {


        // return !value.parentId ? wrappedComponent : rawComponent
        // }
    }

    return renderComponent
}
