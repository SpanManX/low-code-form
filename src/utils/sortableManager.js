import Sortable from 'sortablejs'
import {nextTick, ref} from 'vue'
import {findComponentById} from './findComponentById'
import {createComponent, creatInitSortable, getSelectDOM} from './rendererUtils.js'
import {setData} from './setData'
import teleportStore from "@/store/teleport.js";
import componentMapStore from "@/store/componentMap.js";
import {showToolbar} from "./showToolbar.js";
import {generateRandomId} from "./generateRandomId.js";
import {deepClone} from "@/utils/deepClone.js";

// 组件 schema 和代码
export const schema = ref({
    components: []  // 顶级组件列表，支持嵌套 children
});

let sortableMap = {}

/**
 * 创建一个可排序组件管理器
 *
 * @returns {Object} 包含initSortable方法和schema对象的对象
 */
export function createSortableManager() {
    /**
     * 初始化可排序组件
     *
     * @param {Object} options - 初始化参数
     * @param {string} [options.id=''] - 组件ID
     * @param {HTMLElement} [options.el=null] - DOM元素
     * @param {Object} [options.componentJSON=null] - 组件JSON对象
     */
    function initSortable({id = '', el = null, componentJSON = null}) {
        if (!el && !id) {
            console.error('必须提供 id 或 el');
            return;
        }

        // 如果已存在，先销毁旧的 Sortable 实例
        if (sortableMap[id]) {
            sortableMap[id].destroy();
            delete sortableMap[id];
        }

        let element = el || document.querySelector(`[data-id='${id}']`);
        if (element?.dataset?.component === 'ElCard') {
            element = element.querySelector('.el-card__body');
            if (!element) return;
        } else if (element?.dataset?.component === 'GridComponent' || element?.dataset?.component === 'DivComponent') {
            element = element.querySelector('.element');
            if (!element) return;
        }

        sortableMap[id] = Sortable.create(element, {
            group: {name: 'shared'},
            animation: 150,
            setData: setData,
            onAdd: (event) => {
                if (!event.originalEvent.dataTransfer.getData('type')) {
                    event.item.remove()
                    return
                }
                handleDragDropElement(event)
            },
            onMove: () => {
                teleportStore.SET_TELEPORT_TO(null);
                // toolbarRef.value.style.display = 'none';
            },
            onUpdate: handleSortChange
        });
    }

    /**
     * 元素拖入画布触发
     *
     * @param {Event} event - 拖拽事件对象
     * @description 在拖拽事件中，根据拖拽的组件类型和目标位置，替换或添加元素。
     * 1. 首先获取拖拽事件对象中的数据类型和目标元素。
     * 2. 如果目标元素存在且满足特定条件，则调用 handleSortChange 函数处理排序变更，并返回。
     * 3. 如果拖拽的项不包含 'item' 类，则调用 handleSortChange 函数处理排序变更，并返回。
     * 4. 根据拖拽的数据类型获取组件配置，并创建新组件配置对象。
     * 5. 如果新组件配置对象不需要表单，则直接处理。
     * 6. 如果存在目标元素，则将其添加到目标元素的子组件列表中。
     * 7. 如果不存在目标元素，则根据画布上已有元素的情况，将新拖拽的元素插入到相应位置。
     * 8. 对于特定类型的组件（如 ElCard、ElTabs 等），在下一帧中初始化可排序功能。
     */
    function handleDragDropElement(event) {
        const type = event.originalEvent.dataTransfer.getData('type');
        const dropTarget = event.to.closest('[data-id]');

        if (!event.item.classList.contains('item')) {
            handleSortChange(event);
            return;
        }

        const itemId = event.originalEvent.dataTransfer.getData('itemId');
        // let compConfig = JSON.parse(JSON.stringify(componentMapStore.componentMap[type]));
        let compConfig = deepClone(componentMapStore.componentMap[type])
        if (!compConfig) return;

        let newComp = createComponent(compConfig, itemId); // 创建新组件配置对象
        if (!newComp.noUseForm) {
            // const name = newComp.componentName
            const id = newComp.id
            newComp = {
                componentName: 'ElFormItem',
                props: {label: newComp.text, prop: `field${id}`},
                // on: {
                //     onClick: (e) => {
                //         if (name !== 'ElRadioGroup' && name !== 'ElCheckboxGroup') e.preventDefault();
                //     }
                // },
                id: generateRandomId(),
                children: [newComp]
            }
        }

        if (dropTarget) { // 如果存在目标元素，则添加到子组件列表中
            const parentId = dropTarget.dataset.id;
            const parentNode = findComponentById(schema.value.components, parentId);
            if (parentNode) {
                parentNode.children.splice(event.newIndex, 0, newComp);
            }
        } else {
            if (schema.value.components[event.newIndex]) { // 画布上已有元素，新拖拽的元素插入到最上层触发
                schema.value.components.splice(event.newIndex, 0, newComp);
            } else {
                schema.value.components.push(newComp);
            }
        }

        if (type === "ElCard" || type === 'ElTabs' || type === 'GridComponent' || type === 'DivComponent') {
            nextTick(() => {
                if (newComp.children?.length) { // ElTabs 执行
                    newComp.children.forEach(item => initSortable({id: item.id}));
                } else { // ElCard GridComponent DivComponent执行
                    initSortable({id: newComp.id});
                }
            });
        }
    }

    /**
     * 处理排序变化事件
     *
     * @param {Object} evt - 事件对象，包含拖拽的相关信息
     */
    function handleSortChange(evt) {
        console.log('handleSortChange', evt);
        const itemId = evt.item?.dataset.id;
        if (!itemId) {
            console.error('itemId 为空')
            return;
        }

        const oldParentElement = evt.from.closest('[data-id]');
        const newParentElement = evt.to.closest('[data-id]');

        const oldParentId = oldParentElement?.dataset.id || null;
        const newParentId = newParentElement?.dataset.id || null;

        const oldParent = oldParentId ? findComponentById(schema.value.components, oldParentId) : {children: schema.value.components};
        const newParent = newParentId ? findComponentById(schema.value.components, newParentId) : {children: schema.value.components};

        // 移除
        let [movedItem] = oldParent.children.splice(evt.oldDraggableIndex, 1);
        // 添加
        newParent.children.splice(evt.newIndex, 0, movedItem);
        console.log(schema.value.components);
        if (movedItem.componentName === "ElCard" || movedItem.componentName === 'ElTabs' || movedItem.componentName === 'GridComponent' || movedItem.componentName === 'DivComponent') {
            nextTick(() => {
                if (movedItem.componentName === "ElCard" || movedItem.componentName === 'GridComponent' || movedItem.componentName === 'DivComponent') {
                    initSortable({id: movedItem.id});
                }

                // 初始化子元素
                if (movedItem.children?.length) {
                    creatInitSortable(movedItem.children, initSortable)
                }
                showToolbar(getSelectDOM());
            });
        } else {
            showToolbar(getSelectDOM());
        }
    }

    return {
        initSortable,
        schema
    };
}

/**
 * 重置可排序元素
 *
 * 该函数会遍历 sortableMap 对象中的所有键，并对每个键对应的可排序元素进行销毁操作。
 * 如果键对应的值为空字符串('')，则表示该键对应的元素是根画布，不进行销毁操作。
 */
export function resetSortable() {
    Object.keys(sortableMap).forEach(key => {
        if (sortableMap[key] && key !== '') { // '' 为根画布不可销毁
            sortableMap[key].destroy();
            delete sortableMap[key];
        }
    });
}
