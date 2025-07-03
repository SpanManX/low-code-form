import teleportStore from "../store/teleport";
import {nextTick} from "vue";

/**
 * 显示工具栏并设置其位置
 *
 * @param {HTMLElement} container - 容器元素
 */
export function showToolbar(container) {
    if (!container) return
    teleportStore.SET_TELEPORT_TO(container);
    nextTick(() => {
        const toolbar = container.querySelector('.toolbar')
        container.style.position = 'relative'
        toolbar.style.left = `${container.clientWidth - toolbar.clientWidth}px`
        toolbar.style.bottom = `0px`
    })
}
