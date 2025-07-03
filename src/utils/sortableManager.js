import Sortable from 'sortablejs'
import {nextTick, ref} from 'vue'
import {findComponentById} from './findComponentById'
import {createComponent, creatInitSortable, getSelectDOM} from './rendererUtils.js'
import {setData} from './setData'
import teleportStore from "@/store/teleport.js";
import componentMapStore from "@/store/componentMap.js";
import {showToolbar} from "./showToolbar.js";
import {generateRandomId} from "./generateRandomId.js";

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
    const names = ['ElCard', "ElTabs", 'ElTabPane']

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

        // if (componentJSON) {
        //     const node = findComponentById(schema.value.components, componentJSON.parentId);
        //     node.children.push(JSON.parse(JSON.stringify(componentJSON)))
        // }

        let element = el || document.querySelector(`[data-id='${id}']`);
        if (element?.dataset?.component === 'ElCard') {
            element = element.querySelector('.el-card__body');
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
                replaceElement(event)
            },
            onMove: () => {
                teleportStore.SET_TELEPORT_TO(null);
                // toolbarRef.value.style.display = 'none';
            },
            onUpdate: handleSortChange
        });
    }

    /**
     * 在拖拽事件中替换元素
     *
     * @param {Event} event - 拖拽事件对象
     */
    function replaceElement(event) {
        const type = event.originalEvent.dataTransfer.getData('type');
        // let bool = sortableMap[event.item.dataset.id];
        const dropTarget = event.to.closest('[data-id]');

        if (dropTarget &&
            (dropTarget.dataset.component === 'ElCard' || dropTarget.className === 'el-tab-pane') &&
            event.from.className !== 'component-box') {
            handleSortChange(event);
            return;
        }

        // if (type === 'ElTabs') {
        //     const com = findComponentById(schema.value.components, event.item.dataset.id)
        //     if (com) bool = sortableMap[com.children[0].id];
        // }

        // if (bool || !event.item.classList.contains('item')) {
        if (!event.item.classList.contains('item')) {
            handleSortChange(event);
            return;
        }

        const itemId = event.originalEvent.dataTransfer.getData('itemId');
        let compConfig = JSON.parse(JSON.stringify(componentMapStore.componentMap[type]));
        if (!compConfig) return;

        let newComp = createComponent(compConfig, itemId); // 创建新组件配置对象
        if (!newComp.noUseForm) {
            const name = newComp.componentName
            const id = newComp.id
            newComp = {
                componentName: 'ElFormItem',
                props: {label: newComp.text, prop: `field${id}`},
                on: {
                    onClick: (e) => {
                        if (name !== 'ElRadioGroup' && name !== 'ElCheckboxGroup') e.preventDefault();
                    }
                },
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

        if (type === "ElCard" || type === 'ElTabs') {
            nextTick(() => {
                if (newComp.children?.length) { // ElTabs 执行
                    newComp.children.forEach(item => initSortable({id: item.id}));
                } else { // ElCard 执行
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

        if (movedItem.componentName === "ElCard" || movedItem.componentName === 'ElTabs') {
            nextTick(() => {
                if (movedItem.componentName === "ElCard") {
                    initSortable({id: movedItem.id});
                }

                if (movedItem.children?.length) {
                    console.log(movedItem.children)
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
