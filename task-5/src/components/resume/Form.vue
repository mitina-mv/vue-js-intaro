<template>
    <form class="row g-3 mb-3">
        <div class="mb-3 col-3" v-for="(field, key) in enterData" :key="key">
            <resume-input
                :type="localFields[key].type"
                :name="key"
                :inputType="
                    localFields[key].inputType
                        ? localFields[key].inputType
                        : null
                "
                :caption="localFields[key].title"
                :optionsList="
                    localFields[key].optionsList
                        ? localFields[key].optionsList
                        : null
                "
                v-model="enterData[key]"
                v-model:findValue="findCity"
            />
        </div>

        <div class="edutation-block">
            <div class="caption d-flex">
                <h4 class="h4 me-3 mb-2">Образование</h4>
                <button
                    class="btn btn-outline-success"
                    @click.prevent="addEducation"
                >
                    Добавить образование
                </button>
            </div>

            <div
                class="education-group row g-3"
                v-for="(group, keyGroup) in educationDetail"
                :key="keyGroup"
            >
                <div
                    class="mb-3 col-3"
                    v-for="(field, key) in group"
                    :key="key"
                >
                    <resume-input
                        :type="localFields[key].type"
                        :name="key"
                        v-if="
                            key == 'education' ||
                            (educationDetail[keyGroup].education &&
                                educationDetail[keyGroup].education != 'middle')
                        "
                        :inputType="
                            localFields[key].inputType
                                ? localFields[key].inputType
                                : null
                        "
                        :caption="localFields[key].title"
                        :optionsList="
                            localFields[key].optionsList
                                ? localFields[key].optionsList
                                :educationOprions[keyGroup][key]
                                ? educationOprions[keyGroup][key]
                                :  null
                        "
                        v-model="educationDetail[keyGroup][key]"
                        v-model:findValue="findInstitution[keyGroup]"
                    />
                </div>
                <hr />
            </div>
        </div>

        <button
            class="btn btn-primary"
            @click.prevent="
                $emit(
                    'send',
                    JSON.parse(JSON.stringify(enterData)),
                    JSON.parse(JSON.stringify(educationDetail)),
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
                sex: "",
                workSchedule: "",
                status: "",
            },
            localFields: this.fields,
            findCity: "",
            educationDetail: [
                {
                    education: "middle",
                    institution: "",
                    faculty: "",
                    specialization: "",
                    endYear: "",
                },
            ],
            educationOprions: [{ institution: {}, faculty: {} }],
            findInstitution: [""],
            lastIndexWatchers: -1,
        };
    },
    mounted() {
        for (let key in this.enterData) {
            if (this.fields[key] && this.fields[key]["default"]) {
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
        async loadUniverseOptions(index, str) {
            console.log(this.educationOprions[index]);
            if (this.findInstitution[index].length >= 3) {
                let countryCode = 1;
                let q = `countryCode=${countryCode}&apiKey=${API_KEY}`;

                try {
                    let data = await getDataByApi(
                        `http://localhost:3000/getVkUniverse?${q}&cityId=&q=${str}`
                    );
                    if (data) {
                        this.educationOprions[index].institution =
                            getObjByVkResponse(data.items);
                        this.educationDetail[index].institution =
                            data.items[0]["id"];
                    } else {
                        this.educationOprions[index].institution = [];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async loadFacultiesOptions(index) {
            if (this.educationDetail[index].institution) {
                let countryCode = 1;
                let q = `countryCode=${countryCode}&apiKey=${API_KEY}`;

                try {
                    let data = await getDataByApi(
                        `http://localhost:3000/universe/faculties?${q}&university=${this.educationDetail[index].institution}`
                    );
                    if (data) {
                        this.educationOprions[index].faculty =
                            getObjByVkResponse(data.items);
                        this.educationDetail[index].faculty =
                            data.items[0]["id"];
                    } else {
                        this.educationOprions[index].faculty = [];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },

        addEducation() {
            this.educationDetail.push({
                education: "middle",
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
            });
            this.findInstitution.push("");
            this.educationOprions.push({ institution: {}, faculty: {} })
        },
    },
    computed: {},
    watch: {
        "enterData.region": "loadCityOptions",
        findCity: "loadCityOptions",
        educationDetail: {
            deep: true, // Следим за изменениями во всех вложенных объектах
            handler(newVal) {
                newVal.forEach((item, index) => {
                    // динамически вещаем слежение на свойства institution для обновления факультетов
                    // TODO убрать дублирование слежения
                    this.$watch(
                        () => item.institution,
                        () => this.loadFacultiesOptions(index)
                    );
                });
            },
        },
        findInstitution: {
            deep: true,
            handler(newVal) {
                const startIndex = this.lastIndexWatchers + 1;

                for (let index = startIndex; index < newVal.length; index++) {
                    this.$watch(
                        () => newVal[index],
                        (newUniverse) => {
                            this.loadUniverseOptions(index, newUniverse);
                        }
                    );
                }
                this.lastIndexWatchers = newVal.length - 1;
            },
        },
    },
};
</script>
