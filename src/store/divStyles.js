export default {
    styles:{},

    SET_STYLES(key,value) {
        this.styles[key] = `{\n${this.styleObjectToCssString(value)}\n}`;
    },

    DELETE_STYLES(key) {
        delete this.styles[key];
    },

    styleObjectToCssString(obj) {
        return Object.entries(obj)
            .map(([key, value]) => {
                // 将驼峰命名转换为连字符命名
                const cssKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                // 去除 value 末尾多余逗号，替换为分号
                const cleanValue = typeof value === 'string'
                    ? value.replace(/,\s*$/, '') // 去除结尾逗号
                    : value;
                return `${cssKey}: ${cleanValue};`;
            })
            .join('\n');
    }
}