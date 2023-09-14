<template>
    <div class="container">
        <ResumeForm :fields="fields" :eduDetailFields="eduDetailFields" @send="sendEnterData" />
        <ResumeReport :fields="fields" :eduDetailFields="eduDetailFields" :data="reportData"/>
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
                }
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
            reportData: {}
        };
    },
    methods: {
        sendEnterData(getData) {
            this.reportData = getData
            console.log(this.reportData);
        }
    }
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
