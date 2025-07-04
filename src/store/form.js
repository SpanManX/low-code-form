import {ref} from "vue";

export default {
    formOptions: {
        labelWidth: '',
        labelPosition: 'right'
    },
    formData: ref({}),
    rules: ref({}),

    SET_FORM_OPTIONS({labelWidth, labelPosition}) {
        this.formOptions.labelWidth = labelWidth
        this.formOptions.labelPosition = labelPosition
    },

    SET_FORM_DATA(key,data) {
        this.formData.value[key] = data
    },

    DELETE_FORM_DATA(key) {
        delete this.formData.value[key]
    },

    SET_FORM_RULES(key, data) {
        this.rules.value[key] = data
    },

    DELETE_RULES(key) {
        delete this.rules.value[key]
    },

    CLEAR_ALL() {
        this.formData.value = {}
        this.rules.value = {}
    }
}
