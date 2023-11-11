<template>
    <form @submit.prevent="create" class="grid grid-cols-2 gap-3 form-resume">
        <template v-for="(item, key) in values" :key="key">
            <template v-if="key == 'education'">
                <div class="flex align-items-center gap-2 span-2">
                    <h2>Образование</h2>
                    <Button
                        label="Добавить"
                        severity="success"
                        size="small"
                        icon="pi pi-plus"
                        @click="addEducation"
                        text 
                    />
                </div>
                <template v-for="(education, index) in item" :key="index">
                    
                    <div class="flex align-items-center gap-2 span-2">
                        <h3 class="span-2">Образование {{ index + 1 }}</h3>
                        <Button
                            label="Удалить"
                            severity="danger"
                            size="small"
                            icon="pi pi-trash"
                            @click="deleteEducation(index)"
                            text 
                            v-if="!education['flag_delete']"
                        />

                        <span class="delete-text" v-if="education['flag_delete']">Будет удалено</span>
                    </div>

                    <template
                        v-for="(eduItem, keyItem) in education"
                        :key="keyItem"
                    >
                        <template v-if="!fields[keyItem]"></template>
                        <div
                            class="flex flex-column gap-2"
                            v-else-if="
                                fields[keyItem]['type'] == 'text' &&
                                ((education['level'] &&
                                    education['level'] !== 'middle') ||
                                    keyItem == 'level')
                            "
                        >
                            <FieldText
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors[`education.${index}.${keyItem}`]"
                                @update:editValue="updateEducationValue"
                                :index="index"
                            />
                        </div>

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="
                                fields[keyItem]['type'] == 'select' &&
                                ((education['level'] &&
                                    education['level'] !== 'middle') ||
                                    keyItem == 'level')
                            "
                        >
                            <DropdownSimple
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors[`education.${index}.${keyItem}`]"
                                @update:editValue="updateEducationValue"
                                :options="
                                    keyItem == 'level'
                                        ? fields[keyItem]['optionsList']
                                        : fields[keyItem]['optionsList'][index]
                                "
                                :index="index"
                            />
                        </div>

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="
                                fields[keyItem]['type'] == 'filter-select' &&
                                ((education['level'] &&
                                    education['level'] !== 'middle') ||
                                    keyItem == 'level')
                            "
                        >
                            <DropdownSearcher
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors[`education.${index}.${keyItem}`]"
                                @update:editValue="updateIstitution"
                                :options="fields[keyItem]['optionsList'][index]"
                                @filter="getOptionsList"
                                :index="index"
                            />
                        </div>

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="
                                fields[keyItem]['type'] == 'year' &&
                                ((education['level'] &&
                                    education['level'] !== 'middle') ||
                                    keyItem == 'level')
                            "
                        >
                            <FieldYear
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors[`education.${index}.${keyItem}`]"
                                @update:editValue="updateEducationValue"
                                :index="index"
                            />
                        </div>
                    </template>
                </template>
            </template>

            <template v-else-if="!fields[key]"></template>

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
                v-else-if="fields[key]['type'] == 'money'"
            >
                <FieldMoney
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
                class="flex flex-column gap-2 span-2"
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
                class="flex flex-column gap-2 span-2"
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

        <div class="buttons flex span-2 gap-2">
            <Button
                label="Очистить"
                severity="danger"
                outlined 
                size="small"
                icon="pi pi-times-circle"
                style="width: 15%;"
                @click="nullableResume"
            />
                    
            <Button
                label="Сохранить"
                size="small"
                icon="pi pi-cloud-upload"
                @click="this.$emit('saveResume', this.values)"
                style="width: 15%;"
            />
        </div>
    </form>
</template>

<script>
import Editor from "primevue/editor";
import FieldChips from "@/components/fields/FieldChips.vue";
import FieldText from "@/components/fields/FieldText.vue";
import FieldMask from "@/components/fields/FieldMask.vue";
import DropdownSimple from "@/components/fields/DropdownSimple.vue";
import DropdownSearcher from "@/components/fields/DropdownSearcher.vue";
import FieldCalendar from "@/components/fields/FieldCalendar.vue";
import axios from "axios";
import VK_API_KEY from "/VK_API_KEY.txt";
import { fields } from "@/fields.js";
import FieldYear from "@/components/fields/FieldYear.vue";
import Button from "primevue/button";
import FieldMoney from './fields/FieldMoney.vue';

const API_KEY = VK_API_KEY;

export default {
    data() {
        return {
            institutionList: null,
            facultyList: null,
            fields: fields,
        };
    },

    props: ["resume", 'errors'],

    emits: ['saveResume'],

    async mounted() {
        console.log(this.values);
        let countryCode = 1;
        let q = `countryCode=${countryCode}&apiKey=${API_KEY}&need_all=0`

        if(this.values.city)
        {
            q += `&q=${this.values.city}`
        }

        let data = await this.getRequest(`http://localhost:3000/cities?${q}`);

        if (data) {
            this.fields.city.optionsList = data.items;
        }

        if(this.values.id)
        {
            for(let index in this.values.education)
            {
                let edu = this.values.education[index];

                if(edu.institution) {
                    await this.getInstitution(edu.institution, index);
                    let id = this.fields.institution.optionsList[index][0]['id'];
                    await this.getFaculty(id, index)
                }
            }
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
        FieldYear,
        Button,
        FieldMoney,
    },

    methods: {
        async getOptionsList(event, key, index = 0) {
            switch (key) {
                case "city": {
                    this.getCities(event.value);
                    break;
                }

                case "institution": {
                    this.getInstitution(event.value, index);
                    break;
                }
            }
        },
        async getCities(q){
            let countryCode = 1;
            let query = `countryCode=${countryCode}&apiKey=${API_KEY}&need_all=0&q=${q}`;
            let data = await this.getRequest(
                `http://localhost:3000/cities?${query}`
            );

            if (data) {
                this.fields.city.optionsList = data.items;
            }
        },
        async getInstitution(q, index = 0){
            let countryCode = 1;
            let query = `countryCode=${countryCode}&apiKey=${API_KEY}&q=${q}`;
            let data = await this.getRequest(
                `http://localhost:3000/universe?${query}`
            );

            if (data) {
                if (!this.fields.institution.optionsList[index]) {
                    this.fields.institution.optionsList.push([]);
                }
                this.fields.institution.optionsList[index] = data.items;
            }
        },
        updateValue(newValue, fieldName) {
            this.values[fieldName] = newValue;
        },
        async updateEducationValue(newValue, fieldName, index) {
            this.values["education"][index][fieldName] = newValue;
        },

        async updateIstitution(newValue, index, universeID) {
            this.values["education"][index]["institution"] = newValue;
            await this.getFaculty(universeID, index)
        },

        
        async getFaculty(id, index = 0){
            let countryCode = 1;
            let query = `countryCode=${countryCode}&apiKey=${API_KEY}&university=${id}`;
            let data = await this.getRequest(
                `http://localhost:3000/universe/faculties?${query}`
            );

            if (data) {
                if (!this.fields.faculty.optionsList[index]) {
                    this.fields.faculty.optionsList.push([]);
                }

                let options = [];
                for (let itemIndex in data.items) {
                    options.push({
                        name: data.items[itemIndex].title,
                        code: data.items[itemIndex].title,
                    });
                }
                this.fields.faculty.optionsList[index] = options;
            }
        },

        async getRequest(url) {
            let result = null;

            await axios
                .get(url)
                .then((response) => {
                    if (response.data.response.count > 0) {
                        result = response.data.response;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            return result;
        },
        addEducation() {
            this.values.education.push({
                level: null,
                specialization: null,
                institution: null,
                faculty: null,
                end_year: null,
            });
            this.fields.faculty.optionsList.push([]);
            this.fields.institution.optionsList.push([]);
        },

        deleteEducation(index) {
            let education = this.values.education[index];
            
            if(this.values.education.length - 1 == 0){
                console.log('нельзя удалить все образования');
                return;
            }

            if(education.id)
            {
                education.flag_delete = true;
            } else {
                this.values.education.splice(index, 1);
                this.fields.faculty.optionsList.splice(index, 1);
                this.fields.institution.optionsList.splice(index, 1);
            }
        },
        storeResume()
        {            
            this.$emit('saveResume', this.values);
        },
        nullableResume()
        {
            this.values = {
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
            };
        }
    },
    
    computed: {
        values(){
            return this.resume
        }
    },
};
</script>

<style>
.flex {
    display: flex;
}
.flex-column {
    flex-direction: column;
}
.align-items-center {
    align-items: center;
}
.gap-2 {
    gap: 0.5em;
}
.gap-3 {
    gap: 1em;
}
.grid {
    display: grid;
}
.grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
}
.span-2 {
    grid-column: span 2;
}
.form-resume label {
    font-size: 1em;
    font-weight: bold;
    color: var(--bluegray-700);
}
.form-resume h2,
.form-resume h3 {
    margin: 0;
}
.buttons {
    justify-content: space-between;
    padding: 1em 2em;
    background: var(--surface-a);
    border-radius: var(--border-radius);
    border: 1px solid var(--surface-100);
    position: sticky;
    bottom: 20px;
    margin-top: 1em;
}
.delete-text {
    background: var(--red-600);
    font-weight: bold;
    padding: .5em 1em;
    color: var(--surface-0);
}
</style>
