<template>
    <main>
        <h1>Форма добавления</h1>
        <ResumeForm :resume="values" @saveResume="storeResume" :errors="errors" />
    </main>
</template>

<script>
import ResumeForm from "@/components/ResumeForm.vue";

export default {
    data() {
        return {
            values: {
                profession: null,
                full_name: null,
                city: null,
                photo_path: null,
                phone: null,
                email: null,
                birthdate: null,
                salary: null,                
                work_schedule: null,
                skills: [],
                about: null,
                education: [
                    {
                        level: null,
                        specialization: null,
                        institution: null,
                        faculty: null,
                        end_year: null,
                    },
                ],
            },
        };
    },

    
    mounted() {
    },

    components: {
        ResumeForm,
    },

    methods: {        
        storeResume(resume)
        {
            console.log(resume);           
            this.$store.dispatch('SAVE_RESUME', resume);   
        }
    },
    
    computed: {
        errors() {
            return this.$store.getters.ERRORS;
        }
    }
};
</script>

<style scoped>

main {
    padding: 0 10em;
}
</style>
