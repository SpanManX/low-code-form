import checkbox from '../svg/checkbox.svg'

export default () => {
    return {
        componentName: 'ElCheckboxGroup',
        text: '复选框',
        icon: checkbox,
        props: {},
        children: [
            {
                componentName: 'ElCheckbox',
                props: {label: 'Option A', value: 'ValueA'}
            },
            {
                componentName: 'ElCheckbox',
                props: {label: 'Option B', value: 'ValueB'}
            }
        ]
    };
}
