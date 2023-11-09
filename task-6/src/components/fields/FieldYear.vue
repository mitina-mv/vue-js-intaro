<template>
    <label :for="fieldName">{{ title }}</label>
    <Calendar
        v-model="editValue"
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
    },
    emits: ["update:editValue"],
    computed: {
        modelValue: {
            get() {
                return this.editValue;
            },
            set(newValue) {
                this.$emit("update:editValue", newValue, this.fieldName);
            },
        },
    },
};
</script>

<style></style>
