import upload from '../svg/uploda.svg'

export default () => {
    return {
        componentName: "ElUpload",
        text: "上传组件",
        icon: upload, // 如果没有图标，可以设置为 null
        props: {
            action: "", // 上传地址
            name: "file", // 上传的文件字段名
            headers: {
                Authorization: 'token' // 示例请求头部
            },
            // "on-success": "handleSuccess", // 文件上传成功时的钩子函数
            // "on-error": "handleError", // 文件上传失败时的钩子函数
            limit: 3, // 限制上传文件的个数
            accept: ".jpg,.jpeg,.png,.gif", // 接受上传的文件类型
            // 'auto-upload': false, // 是否自动上传
        },
        on: {
            'http-request': (e) => {
                console.log(e,'自定义上传行为')
            }
        },
        children: [
            {
                componentName: "ElButton",
                label: "Click to upload",
                props: {
                    type: "primary",
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
                        label: "jpg/png files with a size less than 500KB."
                    }
                ]
            }
        ]
    }
}
