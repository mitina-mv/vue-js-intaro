<template>
    <label :for="fieldName">{{ title }}</label>
    <Chips
        :id="fieldName"
        v-model="modelValue"
        separator=","
        :aria-describedby="fieldName + '-help'"
    />
    <small :id="fieldName + '-help'">{{
        error ? "&nbsp;" : 'Вводить через ","'
    }}</small>
    <small class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
</template>

<script>
import Chips from 'primevue/chips';
export default {
    name: 'FieldChips',
    components: {
        Chips,
    },
    props: {        
        editValue: Array,
        fieldName: String,
        title: String,
        error: Array
    },
    emits: ['update:editValue'],
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
}
</script>

<style>

</style>