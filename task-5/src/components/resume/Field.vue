<template>
    <div class="field" :class="getClass">
        <template v-if="type == 'image'">
            <img :src="value" :alt="title" />
            <div class="image-title">{{ title }}</div>
        </template>

        <template v-else-if="type == 'money'">
            <b>{{ title }}:&ensp;</b>
            <span class="money-value"> {{ value.count }} </span>&ensp;
            <span class="money-units"> {{ value.units }}</span>
        </template>

        <template v-else>
            <b>{{ title }}:&ensp;</b>{{ value }}
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

<style>
.field.field-image {
    width: 350px;
    height: 450px;
    border-radius: 25px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    border: 1px solid #ccc;
}

.field.field-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-title {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 25%;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: #0000004d;
    font-size: 1.5em;
    color: #fff;
}
.field {
    font-size: 1.25em;
}
</style>
