<template>
    <h1>dct ok</h1>
    <router-view />
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref } from 'vue'

export default {
    name: "App",
    components: {},

    setup() {
        const router = useRouter();
        const route = useRoute();

        return {
            router,
            route,
        };
    },
};
</script>

<style></style>
