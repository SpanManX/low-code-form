import {generateRandomId} from "./generateRandomId.js";

export function setData(dataTransfer, dragEl) {
    const compName = dragEl.dataset.component;
    dataTransfer.setData('type', compName);
    if (dragEl.closest('[data-id]')) {
        dataTransfer.setData('itemId', dragEl.closest('[data-id]').dataset.id);
    } else {
        dataTransfer.setData('itemId', generateRandomId());
    }
}
