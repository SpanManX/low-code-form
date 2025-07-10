import card from '../svg/card.svg';

export default () => {
    return {
        componentName: 'ElCard',
        text: '卡片',
        icon: card,
        noUseForm: true,
        props: {},
        staticChildren: [
            {
                componentName: 'template',
                slot: 'header',
                staticChildren: [
                    {
                        "componentName": "div",
                        props: {
                            class: "card-header"
                        },
                        label: '卡片标题',
                    }
                ]
            }
        ],
        children: [],
    }
}
