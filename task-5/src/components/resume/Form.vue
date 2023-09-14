<template>
    <form class="row g-3 mb-3">
        <div class="mb-3 col-3" v-for="(field, key) in fields" :key="key">
            <div v-show="
                ![
                    'institution',
                    'faculty',
                    'specialization',
                    'endYear',
                ].includes(key) ||
                (enterData.education !== '' &&
                enterData.education != 'middle')
            ">
                <resume-input
                    :type="field.type"
                    :name="key"
                    :inputType="field.inputType ? field.inputType : null"
                    :caption="field.title"
                    :optionsList="field.optionsList ? field.optionsList : null"
                    v-model="enterData[key]"
                />
            </div>
            
        </div>

        <button
            class="btn btn-primary"
            @click.prevent="
                $emit('send', JSON.parse(JSON.stringify(enterData)))
            "
        >
            Применить
        </button>
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
    emits: ["send"],
    data() {
        return {
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
                    count: 0,
                    units: "rub",
                },
                skills: "",
                aboutMe: "",
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
                sex: "",
                workSchedule: "",
            },
        };
    },
    methods: {
    },
};
</script>
