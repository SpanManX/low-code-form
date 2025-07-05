import teleportStore from "../store/teleport";
import {nextTick} from "vue";
import {getSelectDOM} from "@/utils/rendererUtils.js";

/**
 * 显示工具栏并设置其位置
 *
 * @param {HTMLElement} container - 容器元素
 */
export function showToolbar(container) {
    const dom = getSelectDOM()
    dom.onmouseenter = null
    dom.onmouseleave = null
    if (!container) return
    teleportStore.SET_TELEPORT_TO(container);
    nextTick(() => {
        const toolbar = container.querySelector('.toolbar')
        container.style.position = 'relative'
        // container.getBoundingClientRect().width 包含小数点
        toolbar.style.left = `${container.getBoundingClientRect().width - toolbar.clientWidth}px`
        toolbar.style.bottom = `0px`
        toolbar.style.zIndex = 'auto'

        container.onmouseenter = () => {
            toolbar.style.zIndex = 'auto'
        }
        container.onmouseleave = () => {
            toolbar.style.zIndex = -1
        }
    })
}
