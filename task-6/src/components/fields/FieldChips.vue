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
    <small v-show="error" class="p-error">{{ error ? error[0] : "&nbsp;" }}</small>
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

<style scoped>
ul.p-inputtext.p-chips-multiple-container {
    width: 100%;
}
</style>