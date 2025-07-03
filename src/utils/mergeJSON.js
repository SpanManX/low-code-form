/**
 * 异步合并JSON对象
 */
export async function mergeJSON(data, json, json1, visited = new Set()) {
    return Promise.all(json.map(async (item, i) => {
        if (data[item.id]) { // data 在加载 DEMO 的情况下会不准确，不能全部以 data 为准
            visited.add(item.id);
            json1[i] = {...data[item.id]};
        }

        if (item.children) {
            if (!json1[i].children) {
                json1[i].children = [];
            }

            return await mergeJSON(data, item.children, json1[i].children, visited);
        }
    }));
}
