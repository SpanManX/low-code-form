import {h} from "vue";
import * as ElementPlus from 'element-plus'

// 辅助函数：递归渲染[key]
export function renderStaticChildren(children,key) {
    return children.map(child => {
        // 跳过 template 标签，直接渲染其子节点
        if (child.componentName === 'template' && child[key]) {
            return renderStaticChildren(child[key] );
        }

        // 渲染普通组件或 HTML 元素
        if (child.componentName) {
            const componentProps = {
                ...child.props,
                class: child.props?.class || ''
            };

            const childNodes = child[key]
                ? renderStaticChildren(child[key])
                : undefined;

            return h(
                ElementPlus[child.componentName] || child.componentName,
                componentProps,
                childNodes || child.label
            );
        }

        return null;
    });
}
