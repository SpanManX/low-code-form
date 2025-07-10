export function deepClone(value) {
    if (value === null || typeof value !== 'object') return value;

    // Skip functions (like render/setup)
    // if (typeof value === 'function'){
    //     console.log(value)
    //     return undefined;
    // }

    if (Array.isArray(value)) {
        return value.map(item => deepClone(item)).filter(v => v !== undefined);
    }

    const result = {};
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            const cloned = deepClone(value[key]);
            if (cloned !== undefined) {
                result[key] = cloned;
            }
        }
    }
    return result;
}
