<template>
    <div class="container">
        <h1 class="display-4">Генератор резюме</h1>
        <ResumeForm :fields="fields" @send="sendEnterData" />
        <ResumeReport :fields="fields" :data="reportData" v-if="reportData != null"/>
    </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ResumeForm from "./components/resume/Form.vue";
import ResumeReport from "./components/resume/Report.vue";

export default {
    name: "App",
    components: {
        ResumeForm,
        ResumeReport,
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
                    inputType: "tel",
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
                desiredSalary: {
                    title: "Желаемая зарплата",
                    type: 'money',
                    outerType: "money",
                },
                skills: {
                    title: "Ключевые навыки",
                },
                workSchedule: {
                    title: "График работы",
                    type: "select",
                    optionsList: {
                        full: "Полный день",
                        flexible: "Гибкий график",
                        shift: "Сменный график",
                        remote: "Удаленная работа",
                        watch: "Вахтовый метод",
                    },
                },
                aboutMe: {
                    title: "О себе",
                    type: "textarea",
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

            reportData: null
        };
    },
    methods: {
        sendEnterData(getData) {
            this.reportData = getData
            console.log(getData);
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
