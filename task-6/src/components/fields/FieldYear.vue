<template>
    <label :for="fieldName">{{ title }}</label>
    <InputNumber v-model="modelValue" :id="fieldName" :useGrouping="false" :class="{ 'p-invalid': error }" min="1950" max="2060" />

    <small v-show="error" class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
</template>

<script>
import InputNumber from 'primevue/inputnumber';

export default {
    name: "FieldYear",
    components: {
        InputNumber,
    },
    props: {
        editValue: String,
        fieldName: String,
        title: String,
        error: Array,
        index: Number
    },
    emits: ["update:editValue"],
    computed: {
        modelValue: {
            get() {
                return this.editValue;
            },
            set(newValue) {
                if(this.index !== null)
                    this.$emit('update:editValue', newValue, this.fieldName, this.index)
                else 
                    this.$emit('update:editValue', newValue, this.fieldName)
            },
        },
    },
};
</script>

<style></style>
