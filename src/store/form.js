import {ref} from "vue";

// export const formData = ref({})
// export const formOptions = {
//     labelWidth: '',
//     labelPosition: ''
// }
//
// export function SET_FORM_OPTIONS({labelWidth, labelPosition}) {
//     formOptions.labelWidth = labelWidth
//     formOptions.labelPosition = labelPosition
// }
//
// export function SET_FORM_DATA(data) {
//     formData.value = data
// }

export default {
    formOptions: {
        labelWidth: '',
        labelPosition: ''
    },
    formData: ref({}),
    rules: ref({}),

    SET_FORM_OPTIONS({labelWidth, labelPosition}) {
        this.formOptions.labelWidth = labelWidth
        this.formOptions.labelPosition = labelPosition
    },

    SET_FORM_DATA(data) {
        this.formData.value = data
    },
    SET_FORM_RULES(key,data) {
        this.rules.value[key] = data
    }
}
