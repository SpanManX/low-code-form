import {createApp, nextTick} from 'vue';
import * as ElementPlus from "element-plus";
import {zhCn} from "element-plus/es/locale/index";
import {createRenderer} from "./renderComponent.js";
import componentDataStore from "../store/componentData";
import {generateRandomId} from "./generateRandomId.js";

let saveDOM = null
let saveInitSortable = null

function creatInitSortable(data = []) {
    data.forEach(item => {
        const name = item.componentName;

        if (['ElCard', 'ElTabPane'].includes(name)) {
            if (item.id) {
                saveInitSortable({id: item.id});
            }
        }

        if (item.children && Array.isArray(item.children)) {
            creatInitSortable(item.children);
        }
    });
}

function renderVNodeTree(data, renderFn) {
    if (Array.isArray(data)) {
        return data.map(item => {
            return renderFn(item)
        })
    }
    return renderFn(data)
}

let appMap = {}

/**
 * 创建一个渲染应用实例
 *
 * @param dom 要挂载的DOM节点
 * @param data 要渲染的数据
 * @param renderComponent 用于渲染组件的函数
 * @param initSortable 是否初始化排序功能，默认为false
 * @returns 返回创建的Vue应用实例
 */
export function createRendererApp(dom, data, renderComponent, initSortable) {
    saveInitSortable = initSortable || saveInitSortable // 保存初始的 initSortable 函数，以便在后续调用中使用
    const app = createApp({
        // initSortable 已做重复判断
        mounted() {
            if (Array.isArray(data)) {
                nextTick(() => {
                    creatInitSortable(data)
                })
            }
        },
        // initSortable 已做重复判断
        updated() {
            // console.log(data)
            if (Array.isArray(data)) {
                nextTick(() => {
                    creatInitSortable(data)
                })
            }
        },
        render() {
            /**
             * render() {
             *   return renderComponent()
             * }
             * 这意味着 renderComponent() 是每次渲染时都执行，也就是说：
             *  1.每次修改组件属性，改变布局，renderComponent() 会再次执行。
             *  2.如果 value.children 存在，会递归调用。
             *  3.所以控制台中就会出现多次 ElTabs、ElTabPane、ElButton 的打印 —— 不只是一次挂载调用，而是多次 diff 或更新触发的调用。
             *
             * !!! 使用变量每次更新会重新读取变量的值。使用函数每次更新会执行函数
             **/
            // return renderComponent(componentData)
            // console.trace('[render called]') // 追溯调用信息
            return renderVNodeTree(data, renderComponent)
        }
    }).use(ElementPlus, {locale: zhCn});
    if (!Array.isArray(data)) {
        appMap[data.id] = app
    }
    app.mount(dom);
    return app
}

/**
 * 将组件挂载到画布
 *
 * @param componentData 组件数据对象
 * @param mountPoint 挂载点元素
 * @param type 渲染类型，可选值为'ElCard'或其他
 */
export function renderComponentToCanvas(componentData, mountPoint, type) {
    const container = document.createElement('div');
    container.dataset.component = componentData.componentName === 'ElFormItem' ? componentData.children[0].componentName : componentData.componentName
    container.dataset.id = componentData.id

    mountPoint.replaceWith(container);

    container.classList.add('drop-item');
    if (type === 'ElCard') {
        container.classList.add('drop-item-card');
    } else if (type === 'ElButton') {
        container.classList.add('drop-item-button');
    } else if (type === 'ElTabs') {
        container.classList.add('drop-item-tabs');
    }

    const id = componentData.id
    // if (!componentData.noUseForm) {
    //     const name = componentData.componentName
    //     componentData = {
    //         componentName: 'ElFormItem',
    //         props: {label: componentData.text, prop: `field${id}`},
    //         on: {
    //             onClick: (e) => {
    //                 if (name !== 'ElRadioGroup' && name !== 'ElCheckboxGroup') e.preventDefault();
    //             }
    //         },
    //         children: [componentData]
    //     }
    // }
    const renderComponent = createRenderer()
    componentDataStore.SET_COMPONENT_DATA_MAP(id, componentData)
    createRendererApp(container, componentData, renderComponent, saveInitSortable)
}


export function getSelectDOM() {
    return saveDOM;
}

export function setSelectDOM(dom) {
    saveDOM = dom
}

export function getAppMap() {
    return appMap
}

/**
 * 创建组件 JSON 数据
 *
 * @param compConfig 组件配置对象
 * @param itemId 组件的ID
 * @param parentId 父组件的ID
 * @returns 返回创建的组件对象
 */
export function createComponent(compConfig, itemId, parentId) {
    const newComp = {
        ...compConfig,
        id: itemId,
        parentId
    };

    if (compConfig.children) {
        newComp.children = compConfig.children.map(child => createComponent(child, generateRandomId(), itemId));
    }

    return newComp;
}
