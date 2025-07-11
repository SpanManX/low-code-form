import block from '../svg/block.svg';

export default () => {
    return {
        componentName: 'DivComponent',
        icon: block,
        noUseForm: true,
        text: '块元素',
        props: {
            class: 'block-element'
        },
        children: []
    }
}
