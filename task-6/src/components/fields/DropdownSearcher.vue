<template>
    <label :for="fieldName">{{ title }}</label>
    <Dropdown
        :id="fieldName"
        v-model="modelValue"
        :options="options"
        optionLabel="title"
        optionValue="title"
        placeholder="Введите для поиска..."
        showClear
        filter
        @filter="$emit('filter', $event, fieldName)"
    />
    <small class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
    name: 'DropdownSearcher',
    components: {
        Dropdown,
    },
    props: {        
        editValue: String,
        fieldName: String,
        title: String,
        error: Array,
        options: Array
    },
    emits: ['update:editValue', 'filter'],
    computed: {
        modelValue: {
                get() {
                    return this.editValue
                },
                set(newValue) {
                    this.$emit('update:editValue', newValue, this.fieldName)
                }
            }
    },
};
</script>

<style></style>
