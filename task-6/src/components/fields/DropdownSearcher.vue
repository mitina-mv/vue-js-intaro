<template>
    <label :for="fieldName">{{ title }}</label>
    <Dropdown
        :id="fieldName"
        v-model="modelValue"
        :options="options"
        optionLabel="title"
        optionValue="title"
        placeholder="Введите для поиска..."
        :class="{ 'p-invalid': error }"
        showClear
        filter
        @filter="$emit('filter', $event, fieldName, (index !== null ? index : null))"
    />
    <small v-show="error" class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
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
        options: Array,
        index: Number
    },
    emits: ['update:editValue', 'filter'],
    computed: {
        modelValue: {
                get() {
                    return this.editValue
                },
                set(newValue) {
                    if(this.fieldName == 'institution') {
                        let id = this.options.find((item) => item.title == newValue)
                        this.$emit('update:editValue', newValue, this.index, id.id);
                    }
                    else if(this.index !== null){
                        this.$emit('update:editValue', newValue, this.fieldName, this.index)
                    }
                    else 
                        this.$emit('update:editValue', newValue, this.fieldName)
                }
            }
    },
};
</script>

<style></style>
