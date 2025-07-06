import {generateRandomId} from "./generateRandomId.js";

let saveDOM = null

export function creatInitSortable(data = [], initSortable) {
    data.forEach(item => {
        const name = item.componentName;

        if (['ElCard', 'ElTabPane', 'GridComponent', 'DivComponent'].includes(name)) {
            if (item.id) {
                initSortable({id: item.id});
            }
        }

        if (item.children && Array.isArray(item.children)) {
            creatInitSortable(item.children, initSortable);
        }
    });
}

export function getSelectDOM() {
    return saveDOM;
}

export function setSelectDOM(dom) {
    saveDOM = dom
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
