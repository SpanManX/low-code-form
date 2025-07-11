import {ElMessage} from "element-plus";

export async function copyToClipboard(val) {
    try {
        await navigator.clipboard.writeText(val);
        ElMessage.success('复制成功');
    } catch (err) {
        ElMessage.error(`无法复制内容：${err}`);
    }
}
