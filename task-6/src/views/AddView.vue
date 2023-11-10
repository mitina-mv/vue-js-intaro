<template>
    <h1>форма добавления</h1>
    <form @submit.prevent="create" class="flex flex-column gap-4">
        <template v-for="(item, key) in values" :key="key">
            <template v-if="key == 'education'">
                <template v-for="(itemtwo, keytwo) in item" :key="keytwo">
                    <!-- TODO отрисовка образования -->
                </template>
            </template>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'text'"
            >
                <FieldText
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'email'"
            >
                <FieldText
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'date'"
            >
                <FieldCalendar
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'mask'"
            >
                <FieldMask
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                    :mask="fields[key]['mask']"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'select'"
            >
                <DropdownSimple
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                    :options="fields[key]['optionsList']"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'editor'"
            >
                <label :for="key">{{ fields[key]["title"] }}</label>
                <Editor
                    :id="key"
                    v-model="values[key]"
                    editorStyle="height: 220px"
                />
                <small class="p-error">{{
                    errors[key] ? errors[key][0] : "&nbsp;"
                }}</small>
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'chips'"
            >
                <FieldChips
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                />
            </div>

            <div
                class="flex flex-column gap-2"
                v-else-if="fields[key]['type'] == 'filter-select'"
            >
                <DropdownSearcher
                    :editValue="values[key]"
                    :fieldName="key"
                    :title="fields[key]['title']"
                    :error="errors[key]"
                    @update:editValue="updateValue"
                    :options="fields[key]['optionsList']"
                    @filter="getOptionsList"
                />
            </div>
        </template>
    </form>
</template>

<script>
import Editor from "primevue/editor";
import FieldChips from "@/components/fields/FieldChips.vue";
import FieldText from "@/components/fields/FieldText.vue";
import FieldMask from "@/components/fields/FieldMask.vue";
import DropdownSimple from "@/components/fields/DropdownSimple.vue";
import DropdownSearcher from '@/components/fields/DropdownSearcher.vue';
import FieldCalendar from '@/components/fields/FieldCalendar.vue';
import axios from "axios";
import VK_API_KEY from "/VK_API_KEY.txt";

const API_KEY = VK_API_KEY;

export default {
    data() {
        return {
            errors: {},
            cities: null,
            fields: {
                profession: {
                    title: "Профессия",
                    type: "text",
                },
                full_name: {
                    title: "ФИО",
                    type: "text",
                },
                city: {
                    title: "Город",
                    type: "filter-select",
                    optionsList: [],
                    default: "0",
                },
                photo_path: {
                    title: "Фото",
                    type: "text",
                    outerType: "image",
                },
                phone: {
                    title: "Телефон",
                    type: "mask",
                    mask: "+7 (999) 999-99-99",
                },
                email: {
                    title: "Email",
                    type: "email",
                },
                birthdate: {
                    title: "Дата рождения",
                    type: "date",
                },
                salary: {
                    title: "Желаемая зарплата",
                    type: "money",
                },
                skills: {
                    title: "Ключевые навыки",
                    type: "chips",
                },
                work_schedule: {
                    title: "График работы",
                    type: "select",
                    optionsList: [
                        {
                            name: "Полный день",
                            code: "full",
                        },
                        {
                            name: "Гибкий график",
                            code: "flexible",
                        },
                        {
                            name: "Сменный график",
                            code: "shift",
                        },
                        {
                            name: "Удаленная работа",
                            code: "remote",
                        },
                        {
                            name: "Вахтовый метод",
                            code: "watch",
                        },
                    ],
                    default: "full",
                },
                about: {
                    title: "О себе",
                    type: "editor",
                },
                level: {
                    title: "Образование",
                    type: "select",
                    optionsList: [
                        {
                            name: "Среднее",
                            code: "middle",
                        },
                        {
                            name: "Среднее специальное",
                            code: "middleSpec",
                        },
                        {
                            name: "Неоконченное высшее",
                            code: "semiHigh",
                        },
                        {
                            name: "Высшее",
                            code: "universe",
                        },
                    ],
                    default: "middle",
                },
                institution: {
                    title: "Учебное заведение",
                    type: "filter-select",
                    default: "0",
                },
                faculty: {
                    title: "Факультет",
                    type: "filter-select",
                    default: "0",
                },
                specialization: {
                    title: "Специальность",
                    type: "text",
                },
                end_year: {
                    title: "Год окончания",
                    type: "year",
                },
            },
            values: {
                profession: null,
                full_name: null,
                city: null,
                photo_path: null,
                phone: null,
                email: null,
                birthdate: null,
                salary: null,
                skills: [],
                work_schedule: null,
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

    
    async mounted() {
        let countryCode = 1;
        let q = `countryCode=${countryCode}&apiKey=${API_KEY}&need_all=0&q=`;

        let data = await this.getRequest(`http://localhost:3000/cities?${q}`)

        if(data) {
            this.fields.city.optionsList = data.items;
        }
    },

    components: {
        FieldMask,
        FieldText,
        DropdownSimple,
        Editor,
        FieldChips,
        DropdownSearcher,
        FieldCalendar,
    },

    methods: {
        async getOptionsList(event, key) {
            let countryCode = 1;

            switch(key) {
                case 'city': {
                    let q = `countryCode=${countryCode}&apiKey=${API_KEY}&need_all=0&q=${event.value}`;
                    let data = await this.getRequest(`http://localhost:3000/cities?${q}`)

                    if(data) {
                        this.fields.city.optionsList = data.items;
                    }
                    break;
                }
                    
                case 'institution':
                    break;
                case 'faculty':
                    break;
            }
            console.log(this.values);
        },
        updateValue(newValue, fieldName) {
            this.values[fieldName] = newValue;
        },

        async getRequest(url) {
            let result = null;

            await axios.get(url)
                .then((response) => {
                    if (response.data.response.count > 0) {
                        result = response.data.response
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            return result;

        }
    },
};
</script>

<style>
.cols {
    display: flex;
    gap: 100px;
}
</style>
