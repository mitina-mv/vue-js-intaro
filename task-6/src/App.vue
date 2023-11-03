<template>
	<ResumeMenu />
    <router-view />
</template>

<script>
import ResumeMenu from './components/ResumeMenu';
// import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
    name: "App",
    components: {
        ResumeMenu,
    },

    setup() {
        // const router = useRouter();
        // const route = useRoute();

        // return {
        //     router,
        //     route
        // };
    },
    mounted() {
        this.$store.dispatch('GET_RESUME');
    }
};
</script>

<style></style>
