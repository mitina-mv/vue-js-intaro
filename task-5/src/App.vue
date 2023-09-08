<template>
    <ResumeForm/>
    <ResumeReport/>
</template>

<script>
import ResumeForm from "./components/resume/Form.vue";
import ResumeReport from "./components/resume/Report.vue";

export default {
    name: "App",
    components: {
        ResumeForm,
        ResumeReport,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
