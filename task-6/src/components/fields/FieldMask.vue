<template>
    <label :for="fieldName">{{ title }}</label>
    <InputMask
        :id="fieldName"
        v-model="modelValue"        
        :mask="mask"
        :placeholder="mask"
        :class="{ 'p-invalid': error }"
    />
    <small class="p-error">{{
        error ? error[0] : "&nbsp;"
    }}</small>
</template>

<script>
import InputMask from "primevue/inputmask";

export default {
    name: 'FieldMask',
    components: {
        InputMask,
    },
    props: {        
        editValue: String,
        fieldName: String,
        title: String,
        error: Array,
        mask: String,
        index: Number
    },
    emits: ['update:editValue'],
    computed: {
        modelValue: {
                get() {
                    return this.editValue
                },
                set(newValue) {
                    if(this.index !== null)
                        this.$emit('update:editValue', newValue, this.fieldName, this.index)
                    else 
                        this.$emit('update:editValue', newValue, this.fieldName)
                }
            }
    },
}
</script>

<style>

</style>