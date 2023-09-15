<template>
    <main-layout>
        <template #content>
            <div class="container">
                <h1 class="display-4">Генератор резюме</h1>
                <ResumeForm :fields="fields" @send="sendEnterData" />
                <ResumeReport
                    :fields="fields"
                    :data="reportData"
                    v-if="reportData != null"
                />
            </div>
        </template>
    </main-layout>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import ResumeForm from "./components/resume/Form.vue";
import ResumeReport from "./components/resume/Report.vue";
import MainLayout from "./layouts/MainLayout.vue";
import VK_API_KEY from "../VK_API_KEY.txt";
import axios from "axios";

const API_KEY = VK_API_KEY;

export default {
    name: "App",
    components: {
        ResumeForm,
        ResumeReport,
        MainLayout,
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
                    default: "male",
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
                    type: "money",
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
                    default: "full",
                },
                aboutMe: {
                    title: "О себе",
                    type: "textarea",
                },
                status: {
                    title: "Статус",
                    type: "select",
                    optionsList: {
                        new: "Новое",
                        interview: "Собеседование",
                        adopted: "Принят",
                        refused: "Отказ",
                    },
                    default: "new",
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
                    default: "middle",
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

            reportData: null,
        };
    },
    mounted() {
        let countryCode = 1;

        axios
            .get(
                `https://api.vk.com/method/database.getCities?access_token=${API_KEY}&v=5.131&country_id=${countryCode}&need_all=0`,
                // {
                //     headers: {
                //         "Content-Type": "application/json;charset=UTF-8",
                //         "Access-Control-Allow-Origin": "*", 
                //     },
                // }
            )
            .then((response) => console.log(response));
    },
    methods: {
        sendEnterData(getData) {
            this.reportData = getData;
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
