<template>
    <div class="field" :class="getClass">
        <template v-if="type == 'image'">
            <img :src="value" :alt="title" />
            <div class="image-title">{{ title }}</div>
        </template>

        <template v-else-if="type == 'money'">
            <b>{{ title }}:</b>
            <span class="money-value"> {{ value.count }} </span>&ensp;
            <span class="money-units"> {{ value.units }}</span>
        </template>

        <template v-else>
            <b>{{ title }}:</b> {{ value }}
        </template>
    </div>
</template>

<script>
export default {
    name: "ResumeField",
    props: ["type", "title", "value"],
    computed: {
        getClass() {
            switch (this.type) {
                case "image":
                    return "field-image";
                case "money":
                    return "field-money";
                default:
                    return "";
            }
        },
    },
};
</script>
