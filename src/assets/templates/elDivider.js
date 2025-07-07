import divider from '../svg/divider.svg';

export default () => {
    const label = '这是分割线组件'
    return {
        componentName: 'ElDivider',
        icon: divider,
        noUseForm: true,
        label,
        text: '分割线',
        props: {
            label
        }
    }
}
