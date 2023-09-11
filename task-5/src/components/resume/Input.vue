<template>
    <label :for="name" class="form-label">{{ caption }}:</label>
    <select
        :name="name"
        :id="name"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-select"
        v-if="type == 'select'"
        :value="modelValue"
    >
        <option
            :value="index"
            :key="index"
            v-for="(item, index) in optionsList"
        >
            {{ item }}
        </option>
    </select>

    <input
        :type="inputType"
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-control"
        v-else-if="type == 'input'"
    />

    <textarea
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-else-if="type == 'textarea'"
        class="form-control"
    ></textarea>
</template>

<script>
export default {
    name: "ResumeInput",
    components: {},
    props: {
        type: {
            type: String,
            required: true,
            default: "input",
        },
        name: String,
        caption: String,
        inputType: {
            type: String,
            required: false,
            default: "text",
        },
        optionsList: {
            type: Object,
            required: false,
        },
        enterData: String,
        modelValue: {
            required: false,
        },
    },
    emits: ['update:modelValue'],
    
};
</script>
