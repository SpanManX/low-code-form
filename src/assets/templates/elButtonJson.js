import button from '../svg/button1.svg';

export default () => {
    return {
        componentName: 'ElButton',
        icon: button,
        noUseForm: true,
        label: '按钮',
        text: '按钮',
        props: {type: 'primary'}
    }
}
