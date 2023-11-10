<template>
    <label :for="fieldName">{{ title }}</label>
    <Calendar
        v-model="modelValue"
        view="year"
        dateFormat="yy"
        :class="{ 'p-invalid': error }"
        :id="fieldName"
    />

    <small class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
</template>

<script>
import Calendar from "primevue/calendar";

export default {
    name: "FieldYear",
    components: {
        Calendar,
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
