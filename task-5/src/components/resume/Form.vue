<template>
    <form class="row g-3 mb-3">
        <div class="mb-3 col-3" v-for="(field, key) in localFields" :key="key">
            <div
                v-show="
                    ![
                        'education',
                        'institution',
                        'faculty',
                        'specialization',
                        'endYear',
                    ].includes(key) ||
                    (enterData.education !== '' &&
                        enterData.education != 'middle')
                "
            >
                <resume-input
                    :type="field.type"
                    :name="key"
                    :inputType="field.inputType ? field.inputType : null"
                    :caption="field.title"
                    :optionsList="field.optionsList ? field.optionsList : null"
                    v-model="enterData[key]"
                    v-model:findValue="findCity"
                />
            </div>
        </div>

        <button
            class="btn btn-primary"
            @click.prevent="
                $emit(
                    'send',
                    JSON.parse(JSON.stringify(enterData)),
                    JSON.parse(JSON.stringify(localFields))
                )
            "
        >
            Применить
        </button>
    </form>
</template>

<script>
import ResumeInput from "./Input.vue";
import { getObjByVkResponse, getDataByApi } from "./../../func";
import VK_API_KEY from "./../../../VK_API_KEY.txt";
const API_KEY = VK_API_KEY;

export default {
    name: "ResumeForm",
    components: {
        ResumeInput,
    },
    props: ["fields"],
    emits: ["send"],
    data() {
        return {
            enterData: {
                profession: "",
                region: "",
                city: "",
                photo: "",
                fullName: "",
                phone: "",
                email: "",
                birthdate: "",
                desiredSalary: "",
                skills: "",
                aboutMe: "",
                educationDetail: [
                    {
                        education: "",
                        institution: "",
                        faculty: "",
                        specialization: "",
                        endYear: "",
                    },
                ],
                sex: "",
                workSchedule: "",
                status: "",
            },
            localFields: this.fields,
            findCity: "",
        };
    },
    mounted() {
        for (let key in this.enterData) {
            if (this.fields[key]["default"] && this.enterData[key]) {
                this.enterData[key] = this.fields[key]["default"];
            }
        }
    },
    methods: {
        async loadCityOptions() {
            // Проверка, что region не пустой
            if (this.enterData.region) {
                let countryCode = 1;
                let q = `countryCode=${countryCode}&apiKey=${API_KEY}`;

                try {
                    let data = await getDataByApi(
                        `http://localhost:3000/getVkData?${q}&regionId=${this.enterData.region}&q=${this.findCity}`
                    );
                    if (data) {
                        this.localFields.city.optionsList = getObjByVkResponse(
                            data.items
                        );
                        this.enterData.city = data.items[0]["id"];
                    } else {
                        this.localFields.city.optionsList = [];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async loadUniverseOptions() {
            if (this.enterData.city && this.enterData.education != "middle") {
                console.log("sds");
                let countryCode = 1;
                let q = `countryCode=${countryCode}&apiKey=${API_KEY}`;

                try {
                    let data = await getDataByApi(
                        `http://localhost:3000/getVkUniverse?${q}&cityId=${this.enterData.city}`
                    );
                    if (data) {
                        this.localFields.institution.optionsList =
                            getObjByVkResponse(data.items);
                        this.enterData.institution = data.items[0]["id"];
                    } else {
                        this.localFields.institution.optionsList = [];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        addEducation() {
            this.enterData.educationDetail.push({
                city: "",
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
            });
        },
    },
    computed: {},
    watch: {
        "enterData.region": "loadCityOptions",
        findCity: "loadCityOptions",
        "enterData.city": "loadUniverseOptions",
        "enterData.education": "loadUniverseOptions",
        "enterData.educationDetail": {
            deep: true, // Следим за изменениями во всех вложенных объектах
            handler(newVal) {
                // newVal - новое значение eduDetail
                // oldVal - старое значение eduDetail

                // Вы можете выполнить здесь необходимые действия
                console.log("eduDetail изменился");
                newVal.forEach((item) => {
                    // Добавьте watcher для свойства universe в каждом объекте
                    this.$watch(
                        () => item.institution,
                        this.loadUniverseOptions
                    );
                });
            },
        },
    },
};
</script>
