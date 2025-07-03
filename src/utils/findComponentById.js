let componentMap = {}

/**
 * 在组件树中查找具有指定ID的组件
 *
 * @param components 组件树，包含多个组件的数组
 * @param id 要查找的组件ID
 * @return {Object} 如果找到对应的组件，则返回该组件对象；否则返回null
 */
function findComp(components, id) {
    for (const comp of components) {
        componentMap[id] = comp; // 缓存组件ID到对象映射，以便快速查找
        if (comp.id === id) return comp;
        if (comp.children?.length) {
            const found = findComp(comp.children, id);
            if (found) return found;
        }
    }
    return null;
}

/**
 * 通过组件数组和组件ID查找组件
 *
 * @param components 组件数组
 * @param id 组件ID
 * @return 找到的组件或null
 */
export function findComponentById(components, id) {
    if (componentMap[id]) {  // 如果已经缓存了组件，直接返回
        return componentMap[id];
    } else {            // 否则，在组件树中查找并缓存结果
        return findComp(components, id)
    }
}

/**
 * 递归删除具有指定ID的组件
 *
 * @param components 组件数组
 * @param id 要删除的组件ID
 */
export function removeComponentById(components, id) {
    for (let i = components.length - 1; i >= 0; i--) {
        const comp = components[i];
        if (comp.id === id) {
            components.splice(i, 1); // 移除当前组件
            return;
        }
        if (comp.children?.length) {
            removeComponentById(comp.children, id); // 递归处理子组件
        }
    }
    // return components;
}
