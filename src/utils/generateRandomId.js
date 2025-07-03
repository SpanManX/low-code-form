export function generateRandomId() {
    const timestamp = new Date().getTime()                   // 获取当前时间戳
    const randomNum = Math.floor(Math.random() * 1000)    // 生成一个0-999之间的随机数
    return `${timestamp}${randomNum}`                                // 返回拼接后的ID字符串
}
