import card from '../svg/card.svg';

export default () => {
    const props = {
        label: '卡片标题',
    };
    return {
        componentName: 'ElCard',
        text: '卡片',
        icon: card,
        noUseForm: true,
        props: {
            ...props,
        },
        staticChildren: [
            {
                "componentName": "div",
                slot: 'header',
                props: {
                    class: "card-header"
                },
                ...props
            }
        ],
        children: [],
    }
}
