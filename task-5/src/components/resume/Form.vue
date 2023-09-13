<template>
    <form class="row g-3 mb-3">
        <div class="mb-3 col-3" v-for="(field, key) in fields" :key="key">
            <resume-input
                :type="field.type"
                :name="key"
                :inputType="field.inputType ? field.inputType : null"
                :caption="field.title"
                :optionsList="field.optionsList ? field.optionsList : null"
                v-model="enterData[key]"
            ></resume-input>
            <div
                v-if="key == 'education' && enterData.education && enterData.education != 'middle'"
                class="mb-3 col-3"
            >
                <resume-input
                    v-for="(eduField, keyEdu) in eduDetailFields"
                    :key="keyEdu"
                    :type="eduField.type"
                    :name="keyEdu"
                    :caption="eduField.title"
                    :optionsList="
                        eduField.optionsList ? eduField.optionsList : null
                    "
                    v-model="enterData[keyEdu]"
                ></resume-input>
            </div>
        </div>

        <button class="btn btn-primary" @click.prevent="log">Применить</button>
    </form>
</template>

<script>
import ResumeInput from "./Input.vue";

export default {
    name: "ResumeForm",
    components: {
        ResumeInput,
    },
    props: ["fields", "eduDetailFields"],
    data() {
        return {
            data1: "11",
            enterData: {
                profession: "",
                city: "",
                photo: "",
                fullName: "",
                phone: "",
                email: "",
                birthdate: "",
                education: "",
                desiredSalary: {
                    value: 0,
                    units: 'rub'
                },
                skills: "",
                aboutMe: "",
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
            },
        };
    },
    methods: {
        log() {
            console.log(this.enterData);
        },
    },
};
</script>
