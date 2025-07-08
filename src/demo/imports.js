export default function (excludes) {
    const setData = new Set(excludes)
    const modules = {};
    let module = null;
    let arr = []

    // 使用 import.meta.glob 动态加载 src/modules 文件夹中的所有 JS 文件
    // eager 表示文件应该被立即导入，而不是使用的时候才导入
    const files = import.meta.glob('./**/*.js', {eager: true});

    // 遍历所有文件
    for (const path in files) {
        arr = path.split('/')
        if (setData.has(arr[arr.length - 1])) {
            continue;
        }

        module = files[path]
        // const moduleName = path.match(/./api/(.*).js$/)[1];
        const moduleName = path.match(/([^/]+).js$/)[1];
        modules[moduleName] = module.default;
    }
    return modules
};