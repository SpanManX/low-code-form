import button from '../svg/button1.svg';

export default () => {
    const label = '按钮'
    return {
        componentName: 'ElButton',
        icon: button,
        noUseForm: true,
        label,
        // text: '按钮',
        props: {type: 'primary', label,}
    }
}
