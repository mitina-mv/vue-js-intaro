<template>
    <h1>форма добавления</h1>
    <form @submit.prevent="create" class="flex flex-column gap-4">
        <template v-for="(item, key) in values" :key="key">
            <template v-if="key == 'education'">
                <h3>Образование</h3>
                <template v-for="(education, index) in item" :key="index">
                    <h4>Образование {{ index + 1 }}</h4>
                    <template v-for="(eduItem, keyItem) in education" :key="keyItem">
                        <div
                            class="flex flex-column gap-2"
                            v-if="fields[keyItem]['type'] == 'text' && ((education['level'] && education['level'] !== 'middle') || keyItem == 'level')"
                        >
                            <FieldText
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors['education'] ? errors['education'][index][keyItem] : null"
                                @update:editValue="updateEducationValue"
                                :index="index"
                            />
                        </div>

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="fields[keyItem]['type'] == 'select' && ((education['level'] && education['level'] !== 'middle') || keyItem == 'level')"
                        >
                            <DropdownSimple
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors['education'] ? errors['education'][index][keyItem] : null"
                                @update:editValue="updateEducationValue"
                                :options="(keyItem == 'level' ? fields[keyItem]['optionsList'] : fields[keyItem]['optionsList'][index])"
                                :index="index"
                            />
                        </div>                        

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="fields[keyItem]['type'] == 'filter-select' && ((education['level'] && education['level'] !== 'middle') || keyItem == 'level')"
                        >
                            <DropdownSearcher
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors['education'] ? errors['education'][index][keyItem] : null"
                                @update:editValue="updateIstitution"
                                :options="fields[keyItem]['optionsList'][index]"
                                @filter="getOptionsList"
                                :index="index"
                            />
                        </div>

                        <div
                            class="flex flex-column gap-2"
                            v-else-if="fields[keyItem]['type'] == 'year' && ((education['level'] && education['level'] !== 'middle') || keyItem == 'level')"
                        >
                            <FieldYear
                                :editValue="values['education'][index][keyItem]"
                                :fieldName="keyItem"
                                :title="fields[keyItem]['title']"
                                :error="errors['education'] ? errors['education'][index][keyItem] : null"
                                @update:editValue="updateEducationValue"
                                :index="index" 
                            />
                        </div>
                    </template>
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
import {fields} from '@/fields.js'
import FieldYear from '@/components/fields/FieldYear.vue';

const API_KEY = VK_API_KEY;

export default {
    data() {
        return {
            errors: {},
            institutionList: null,
            facultyList: null,
            fields: fields,
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
        FieldYear,
    },

    methods: {
        async getOptionsList(event, key, index = 0) {
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
                    
                case 'institution': {
                    let q = `countryCode=${countryCode}&apiKey=${API_KEY}&need_all=0&q=${event.value}`;
                    let data = await this.getRequest(`http://localhost:3000/universe?${q}`)

                    if(data) {
                        if(!this.fields.institution.optionsList[index]) {
                            this.fields.institution.optionsList.push([])
                        }
                        this.fields.institution.optionsList[index] = data.items;
                    }
                    break;
                }                    
            }
        },
        updateValue(newValue, fieldName) {
            this.values[fieldName] = newValue;
        },
        async updateEducationValue(newValue, fieldName, index) {
            this.values['education'][index][fieldName] = newValue;
        },

        async updateIstitution(newValue, index, universeID)
        {
            let countryCode = 1;
            
            this.values['education'][index]['institution'] = newValue;

            let q = `countryCode=${countryCode}&apiKey=${API_KEY}&university=${universeID}`;
            let data = await this.getRequest(`http://localhost:3000/universe/faculties?${q}`)

            if(data) {
                if(!this.fields.faculty.optionsList[index]) {
                    this.fields.faculty.optionsList.push([])
                }

                let options = [];
                for(let itemIndex in data.items) {
                    options.push({
                        name: data.items[itemIndex].title,
                        code: data.items[itemIndex].title,
                    })
                }
                this.fields.faculty.optionsList[index] = options;
            }
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
