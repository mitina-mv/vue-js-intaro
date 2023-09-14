<template>
    <h5 class="display-5">Резюме</h5>
    <div class="report">
        <div v-for="(group, indexGroup) in fieldGroups" :key="indexGroup">
            <h6 class="display-6 mb-3" v-if="group.title">{{ group.title }}</h6>
            <template v-for="key in group.names" :key="key">
                <template v-if="data[key]">
                    <resume-field
                        :title="fields[key]['title']"
                        :value="
                            fields[key]['type'] == 'select'
                                ? fields[key]['optionsList'][data[key]]
                                : data[key]
                        "
                        :type="
                            fields[key]['outerType']
                                ? fields[key]['outerType']
                                : 'text'
                        "
                        class="mb-2"
                    />
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import ResumeField from "./Field.vue";

export default {
    props: ["data", "fields", "eduDetailFields"],
    name: "ResumeReport",
    components: {
        ResumeField,
    },
    methods: {},
    data() {
        return {
            fieldGroups: [
                {
                    title: "Личная информация",
                    names: [
                        "fullName",
                        "city",
                        "sex",
                        "phone",
                        "email",
                        "birthdate",
                    ],
                },
                {
                    names: ["photo"],
                },
                {
                    title: "Профессиональные качества",
                    names: [
                        "profession",
                        "desiredSalary",
                        "skills",
                        "workSchedule",
                        "aboutMe",
                    ],
                },
                {
                    title: "Образование",
                    names: [
                        "education",
                        "institution",
                        "faculty",
                        "specialization",
                        "endYear",
                    ],
                },
            ],
        };
    },
};
</script>

<style>
.report {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 0 auto;
}
</style>
