<template>
    <div class="container">
        <ResumeForm :fields="fields" :eduDetailFields="eduDetailFields" />
    </div>
    <!-- <ResumeReport/> -->
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ResumeForm from "./components/resume/Form.vue";
// import ResumeReport from "./components/resume/Report.vue";

export default {
    name: "App",
    components: {
        ResumeForm,
        // ResumeReport,
    },
    data() {
        return {
            fields: {
                profession: {
                    title: "Профессия",
                },
                city: {
                    title: "Город",
                },
                photo: {
                    title: "Фото",
                    type: "input",
                    inputType: "file",
                    outerType: "image",
                },
                fullName: {
                    title: "ФИО",
                },
                phone: {
                    title: "Телефон",
                },
                sex: {
                    title: "Пол",
                    type: "select",
                    optionsList: {
                        male: "Муж",
                        fimale: "Жен",
                    },
                },
                email: {
                    title: "Email",
                    inputType: "email",
                },
                birthdate: {
                    title: "Дата рождения",
                    type: "input",
                    inputType: "date",
                },
                education: {
                    title: "Образование",
                    type: "select",
                    optionsList: {
                        middle: "Среднее",
                        middleSpec: "Среднее специальное",
                        semiHigh: "Неоконченное высшее",
                        universe: "Высшее",
                    },
                },
                desiredSalary: {
                    title: "Желаемая зарплата",
                    type: 'money'
                },
                skills: {
                    title: "Ключевые навыки",
                },
                aboutMe: {
                    title: "О себе",
                    type: "textarea",
                },
            },

            eduDetailFields: {
                institution: {
                    title: "Учебное заведение",
                },
                faculty: {
                    title: "Факультет",
                },
                specialization: {
                    title: "Специальность",
                },
                endYear: {
                    title: "Год окончания",
                    inputType: "number",
                },
            },
        };
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
