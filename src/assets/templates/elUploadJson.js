import upload from '../svg/uploda.svg'

export default () => {
    return {
        componentName: "ElUpload",
        text: "上传组件",
        icon: upload,
        props: {
            // action: "", // 上传地址
            // name: "file", // 上传的文件字段名
            // headers: {
            //     Authorization: 'token' // 示例请求头部
            // },
        },
        children: [
            {
                componentName: "ElButton",
                label: "请选择文件",
                props: {
                    type: "primary",
                    icon: 'Plus',
                    iconStyle: {}
                }
            },
            {
                componentName: "template",
                slot: "tip",
                children: [
                    {
                        componentName: "div",
                        props: {
                            class: "el-upload__tip"
                        },
                        label: ""
                    }
                ]
            }
        ]
    }
}
