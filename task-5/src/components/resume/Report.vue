<template>
    <div class="" v-for="(item, key) in data" :key="key">
        <template v-if="item">
            <resume-field 
                :title="fields[key]['title']"
                :value="fields[key]['type'] == 'select' ? fields[key]['optionsList'][item] : item"
                :type="fields[key]['outerType'] ? fields[key]['outerType'] : 'text'"
            />
        </template>
    </div>
</template>

<script>
import ResumeField from "./Field.vue";

export default {
    props: ['data', 'fields', 'eduDetailFields'],
    name: "ResumeReport",
    components: {
        ResumeField
    },
    methods: {
    }
};
</script>