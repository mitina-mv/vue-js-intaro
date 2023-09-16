<template>
    <main-layout>
        <template #content>
            <div class="container" v-if="loadFields">
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
// import axios from "axios";
import { getObjByVkResponse, getDataByApi } from "./func";

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
                region: {
                    title: "Регион",
                    type: "select",
                    optionsList: [],
                    default: "0",
                },
                city: {
                    title: "Город",
                    type: "find-select",
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
                    type: "find-select",
                    optionsList: [],
                    default: "0",
                },
                faculty: {
                    title: "Факультет",
                    type: "select",
                    optionsList: [],
                    default: "0",
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
            loadFields: false,
        };
    },
    async mounted()
    {
        let countryCode = 1;
        let q = `countryCode=${countryCode}&apiKey=${API_KEY}`;

        let res1 = await getDataByApi(`http://localhost:3000/getVkRegions?${q}`)
        if(res1) {
            this.fields.region.optionsList = getObjByVkResponse(res1.items)
            this.fields.region.default = res1.items[0]["id"]
        }

        let res2 = await getDataByApi(`http://localhost:3000/getVkData?${q}&regionId=${this.fields.region.default}&q=`)
        if(res2) {
            this.fields.city.optionsList = getObjByVkResponse(res2.items)
            this.fields.city.default = res2.items[0]["id"]
        }

        this.loadFields = true;
    },
    methods: {
        sendEnterData(getData, fields)
        {
            this.reportData = {}
            for(let f in getData) {
                if(fields[f].type == 'select' || fields[f].type == 'find-select') {
                    this.reportData[f] = fields[f].optionsList[getData[f]]
                } else {
                    this.reportData[f] = getData[f]
                }
            }
            
        },
    },
    computed: {},
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
