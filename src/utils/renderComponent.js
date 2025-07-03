import {h, isReactive, reactive} from 'vue'
import * as ElementPlus from 'element-plus'
import divComponent from "@/components/divComponent.vue";
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
    const {isTemplate = false} = options

    const formData = formStore.formData  // 表单数据（用于 v-model），默认值为 null
    const names = namesStore                             // 不需要双向绑定的组件名列表，默认值为空数组
    const {labelWidth} = formStore.formOptions            // 表单 label 宽度，默认值为 null
    const saveId = new Set()

    /**
     * 渲染组件
     *
     * @param value 要渲染的组件数据
     * @returns 渲染后的组件对象
     */
    function renderComponent(value) {
        if (!isReactive(value)) value = reactive(value || {})

        if (!value.parentId) {
            componentDataStore.SET_COMPONENT_DATA_MAP(value.id, value)
        }

        if (value.componentName === 'ElFormItem' && value.props.rules) {
            formStore.SET_FORM_RULES(`field${value.children[0].id}`, value.props.rules)
        }
        // if (isTemplate) {
        //
        //     const id = value.id
        //     if (!saveId.has(id) && !value.parentId) {
        //         // 将通过 findComponentById 方法从 schema 数据中查找到的组件信息，以 value.id 作为键，存入 componentDataStore 的组件数据映射中。
        //         // 此处使用 schema 数据，即复制了组件的引用，以达到在其他修改 componentDataMap 也跟着变化。
        //         // componentDataStore.SET_COMPONENT_DATA_MAP(value.id, findComponentById(schema.value.components, value.id))
        //         // componentDataStore.SET_TEMPLATE_COMPONENT_DATA_MAP(value.id, value)
        //         // componentDataStore.SET_COMPONENT_DATA_MAP(value.id, value)
        //         saveId.add(id)
        //     }
        // }

        const props = {...value.props}
        const events = value.on || {}

        // value.id in formData.value 是 JavaScript 中的一个语法，用来判断一个对象是否包含某个属性
        if (names.indexOf(value.componentName) === -1 && !(`field${value.id}` in formData.value)) {
            // 会触发render更新
            if (value.componentName === 'ElTabs') {
                formData.value[`field${value.id}`] = value.children[0].props.name || ''
            } else {
                formData.value[`field${value.id}`] = value.componentName === 'ElCheckboxGroup' ? [] : ''
            }
        }

        if (formData && names.indexOf(value.componentName) === -1) {
            props.modelValue = formData.value[`field${value.id}`]
            props['onUpdate:modelValue'] = (val) => {
                formData.value[`field${value.id}`] = val
            }
        }

        // 处理插槽内容
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
                class: 'drop-item drop-item-card', 'data-id': value.id, 'data-component': value.componentName
            }, [h(ElementPlus[value.componentName], props, {
                default: defaultData, header: () => renderStaticChildren(value.staticChildren)
            })])
        }

        const componentName = value.componentName === 'ElFormItem' ? value.children?.[0]?.componentName : value.componentName

        const rawComponent = h(ElementPlus[value.componentName], {
            ...props,
            ...events
        }, defaultData)

        const wrappedComponent = h(divComponent, {componentData: {...value, componentName}}, {
            default: () => [h(ElementPlus[value.componentName], {
                ...props,
                ...(labelWidth ? {'label-width': labelWidth} : {}),
                ...events
            }, defaultData)]
        })
        // if (notDiv) {
        //     return rawComponent
        // }
        // if (!isTemplate) {
        return value.componentName === 'ElFormItem' || value.componentName === 'ElTabs' || value.componentName === 'ElButton' ? wrappedComponent : rawComponent
        // } else {


        // return !value.parentId ? wrappedComponent : rawComponent
        // }
    }

    return renderComponent
}
