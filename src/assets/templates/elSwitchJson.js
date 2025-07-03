import switchIcon from '../svg/switch.svg';

export default () => {
    return {
        componentName: 'ElSwitch',
        icon: switchIcon,
        text: '开关',
        props: {
            'active-text': '开',
            'inactive-text': '关'
        }
    }
}