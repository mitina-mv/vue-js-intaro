<template>
    <main>
        <h1>Редактирование: {{ resumeDetail.full_name }}</h1>
        <ResumeForm v-if="resumeDetail.id" :resume="resumeDetail" @saveResume="storeResume" :errors="errors" />
    </main>
</template>

<script>
import ResumeForm from "@/components/ResumeForm.vue";

export default {
    name: 'EditView',
    data() {
        return {
        }
    },
    
    mounted() {
        this.$store.dispatch('GET_DETAIL_RESUME', this.$route.params.id);
    },

    components: {
        ResumeForm,
    },

    methods: {        
        storeResume(resume)
        {      
            this.$store.dispatch('UPDATE_RESUME', resume);   
        }
    },
    computed: {
        errors() {
            return this.$store.getters.ERRORS;
        },
        resumeDetail() {
            return this.$store.getters.RESUME_DETAIL
        }
    }
};
</script>

<style scoped>

main {
    padding: 0 10em;
}
</style>
