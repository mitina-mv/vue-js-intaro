<template>
    <main>
        <h1>форма добавления</h1>
        <ResumeForm :resume="values" />
    </main>
</template>

<script>
import ResumeForm from "@/components/ResumeForm.vue";

export default {
    data() {
        return {
            errors: {},
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
    },
};
</script>

<style scoped>

main {
    padding: 0 10em;
}
</style>
