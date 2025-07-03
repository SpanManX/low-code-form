export default {
    componentDataMap: {},

    SET_COMPONENT_DATA_MAP(id, val) {
        if (!val || !id) {
            return console.error('组件和ID不能为空')
        }
        this.componentDataMap[id] = val
    },

    CLEAR_COMPONENT_DATA_MAP() {
        this.componentDataMap = {}
    }
}
