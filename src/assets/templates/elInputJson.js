import input from '../svg/input.svg';

export default () => {
    return {
        componentName: 'ElInput',
        icon: input,
        text: '输入框',
        props: {placeholder: '请输入内容'}
    }
}