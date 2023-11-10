<template>
    <label :for="fieldName">{{ title }}</label>
    <Dropdown
        :id="fieldName"
        v-model="modelValue"
        :options="options"
        optionLabel="name"
        optionValue="code"
        placeholder="Выберите..."
    />
    <small class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
</template>

<script>
import Dropdown from 'primevue/dropdown';

export default {
    name: 'DropdownSimple',
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
};
</script>

<style></style>