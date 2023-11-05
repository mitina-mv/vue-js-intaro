<template>
    <h1>форма добавления</h1>
    <form
        @submit.prevent="create"
        class="flex flex-column gap-4"
    >
        <template v-for="(item, key) in values" :key="key">
            <template v-if="Array.isArray(item)">
                <template v-for="(itemtwo, keytwo) in item" :key="keytwo">

                </template>
            </template>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'text'">
                <label :for="key">{{ fields[key]['title'] }}</label>
                <InputText
                    :id="key"
                    v-model="values[key]"
                    :class="{ 'p-invalid': errors[key] }"
                />
                <small class="p-error">{{
                    errors[key] ? errors[key][0] : "&nbsp;"
                }}</small>
            </div>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'mask'">
                <label :for="key">{{ fields[key]['title'] }}</label>
                <InputMask
                    :id="key"
                    v-model="values[key]"
                    :mask="fields[key]['mask']"
                    :placeholder="fields[key]['mask']"
                    :class="{ 'p-invalid': errors[key] }"
                />
                <small class="p-error">{{
                    errors[key] ? errors[key][0] : "&nbsp;"
                }}</small>
            </div>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'select'">
                <label :for="key">{{ fields[key]['title'] }}</label>
                <Dropdown :id="key" v-model="values[key]" :options="fields[key]['optionsList']" optionLabel="name" optionValue="code" placeholder="Выберите..." />
                <small class="p-error">{{
                    errors[key] ? errors[key][0] : "&nbsp;"
                }}</small>
            </div>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'editor'">
                <label :for="key">{{ fields[key]['title'] }}</label>
                <Editor :id="key" v-model="values[key]" editorStyle="height: 220px" />
                <small class="p-error">{{
                    errors[key] ? errors[key][0] : "&nbsp;"
                }}</small>
            </div>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'chips'">
                <label :for="key">{{ fields[key]['title'] }} {{ key }}</label>
                <Chips
                    :id="key"
                    v-model="values['skills']"
                    separator=","
                    :aria-describedby="key + '-help'"
                />
                <small :id="key + '-help'">{{
                    errors[key] ? "&nbsp;" : 'Вводить через ","'
                }}</small>
                <small class="p-error">{{ errors[key] ? errors[key][0] : "&nbsp;" }}</small>
            </div>

            <div class="flex flex-column gap-2" v-else-if="fields[key]['type'] == 'filter-select'">
                <label :for="key">{{ fields[key]['title'] }} {{ key }}</label>
                <Dropdown :id="key" v-model="values[key]" :options="cities" showClear filter optionLabel="name" placeholder="Введите для поиска..." @filter="getOptionsList($event, key)" />
                <small class="p-error">{{ errors[key] ? errors[key][0] : "&nbsp;" }}</small>
            </div>
        </template>

        {{ values['skills'] }}
        <Chips v-model="values['skills']" separator=","  />
    </form>
</template>

<script>
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import Chips from 'primevue/chips';

export default {
    data() {
        return {
            errors: {},
            cities: null,
            fields: {
                profession: {
                    title: "Профессия",
                    type: 'text',
                },                
                full_name: {
                    title: "ФИО",
                    type: 'text',
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
                    type: 'mask',
                    mask: '+7 (999) 999-99-99'
                },
                email: {
                    title: "Email",
                    type: "email",
                },
                birthdate: {
                    title: "Дата рождения",
                    type: 'date',
                },
                salary: {
                    title: "Желаемая зарплата",
                    type: "money",
                },
                skills: {
                    title: "Ключевые навыки",
                    type: 'chips'
                },
                work_schedule: {
                    title: "График работы",
                    type: "select",
                    optionsList: [
                        {
                            name: "Полный день",
                            code: 'full'
                        },
                        {
                            name: "Гибкий график",
                            code: 'flexible'
                        },
                        {
                            name: "Сменный график",
                            code: 'shift'
                        },
                        {
                            name: "Удаленная работа",
                            code: 'remote'
                        },
                        {
                            name: "Вахтовый метод",
                            code: 'watch'
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
                            code: 'middle'
                        },
                        {
                            name: "Среднее специальное",
                            code: 'middleSpec'
                        },
                        {
                            name: "Неоконченное высшее",
                            code: 'semiHigh'
                        },
                        {
                            name: "Высшее",
                            code: 'universe'
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
                    inputType: "number",
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
                skills: null,
                work_schedule: null,
                about: null,
                education: [
                    {
                        level: null,
                        specialization: null,
                        institution: null,
                        faculty: null,
                        end_year: null,
                    }
                ],
            }
        };
    },

    components: {
        InputMask,
        InputText,
        Dropdown,
        Editor,
        Chips,
    },

    methods: {
        getOptionsList(event, key){
            console.log(key);
            console.log(event.value);
        }
    }
};
</script>

<style>
.cols {
    display: flex;
    gap: 100px;
}
</style>
