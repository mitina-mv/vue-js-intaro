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
import { getObjByVkResponse } from './func'

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
                    type: "select",
                    optionsList: [],
                    default: "0",
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
                    type: "select",
                    optionsList: [],
                    default: "0",
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
                `http://localhost:3000/getVkData?countryCode=${countryCode}&apiKey=${API_KEY}`
            )
            .then((response) => {
                this.fields.city.optionsList = getObjByVkResponse(response.data.response.items)
                this.fields.city.default = response.data.response.items[0]['id']
            })
            .catch((error) => {
                console.error(error);
            });

        axios
            .get(
                `http://localhost:3000/getVkUniverse?countryCode=${countryCode}&apiKey=${API_KEY}&cityId=1`
            )
            .then((response) => {
                this.fields.institution.optionsList = getObjByVkResponse(response.data.response.items)
                this.fields.institution.default = response.data.response.items[0]['id']
            })
            .catch((error) => {
                console.error(error);
            });
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
