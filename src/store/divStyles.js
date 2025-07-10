export default {
    styles: {},

    SET_STYLES(key, value) {
        this.styles[key] = `{\n${this.styleObjectToCssString(value)}\n}`;
    },

    GET_STYLE_NEW_KEY(key) {
        let newKey = key;
        let counter = 1;

        // 如果 key 已存在，则自动递增后缀直到找到未被使用的 key
        while (this.styles.hasOwnProperty(newKey)) {
            newKey = `${key}${counter}`;
            counter++;
        }

        return newKey
    },

    DELETE_STYLES(key) {
        delete this.styles[key];
    },

    styleObjectToCssString(obj) {
        return Object.entries(obj)
            .map(([key, value]) => {
                if (value === undefined || value === null) {
                    return '';
                }
                // 将驼峰命名转换为连字符命名
                const cssKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                // 去除 value 末尾多余逗号，替换为分号
                const cleanValue = typeof value === 'string'
                    ? value.replace(/,\s*$/, '') // 去除结尾逗号
                    : value;
                return `${cssKey}: ${cleanValue};`;
            })
            .filter(Boolean)
            .join('\n');
    }
}
