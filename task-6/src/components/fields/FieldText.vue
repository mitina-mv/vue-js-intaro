<template>
    <label :for="fieldName">{{ title }}</label>
    <InputText
        :id="fieldName"
        v-model="modelValue"
        :class="{ 'p-invalid': error }"
    />
    <small class="p-error">{{
        error ? error[0] : "&nbsp;"
    }}</small>
</template>

<script>
import InputText from "primevue/inputtext";

export default {
    name: 'FieldText',
    components: {
        InputText,
    },
    props: {        
        editValue: String,
        fieldName: String,
        title: String,
        error: Array,
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