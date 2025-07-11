import {reactive, ref} from "vue";

export default {
    formOptions: reactive({
        labelWidth: null,
        labelPosition: 'right',
        inline: false,
    }),
    formData: ref({}),
    previewFormData: ref({}),
    rules: ref({}),

    SET_FORM_OPTIONS({labelWidth, labelPosition}) {
        this.formOptions.labelWidth = labelWidth
        this.formOptions.labelPosition = labelPosition

    },
    SET_FORM_OPTIONS_INIT(inline) {
        this.formOptions.inline = inline
    },
    SET_FORM_DATA(key, data) {
        this.formData.value[key] = data
    },
    SET_PREVIEW_FORM_DATA(key, data) {
        this.previewFormData.value[key] = data
    },
    CLEAR_PREVIEW_FORM_DATA() {
        this.previewFormData.value = {}
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
    INIT_FORM_OPTIONS() {
        this.formOptions.labelWidth = null
        this.formOptions.labelPosition = 'right'
        this.formOptions.inline = false
    },
    CLEAR_ALL() {
        this.formData.value = {}
        this.rules.value = {}
        this.previewFormData.value = {}
        this.INIT_FORM_OPTIONS()
    }
}
