export default {
    icons: {},
    SET_ICONS(key, icon) {
        this.icons[key] = icon
    },
    DELETE_ICONS(key) {
        delete this.icons[key]
    }
}
