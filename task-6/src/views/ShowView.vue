<template>
    <main>
        <div class="header">
            <h1>{{ resumeDetail.full_name }}</h1>
            <Button text>
                <router-link :to="'/edit/' + resumeDetail.id"
                    ><i class="pi pi-pencil"></i
                ></router-link>
            </Button>
            <div class="status" :class="'status_' + resumeDetail.status">
                {{ status }}
            </div>
        </div>

        <div class="resume">
            <Image
                :src="resumeDetail.photo_path"
                :alt="resumeDetail.full_name"
                width="350"
                height="500"
                preview
                class="photo"
            />
            <div class="info">
                <template v-for="(item, key) in resumeDetail" :key="key">
                    <div
                        class="resume-field"
                        v-if="
                            [
                                'education',
                                'skills',
                                'about',
                                'id',
                                'status',
                                'photo_path',
                            ].indexOf(key) == -1 &&
                            fields[key] &&
                            fields[key]['type'] != 'select'
                        "
                    >
                        <span>{{ fields[key]["title"] }}</span
                        >: {{ item }}
                    </div>

                    <div
                        class="resume-field"
                        v-else-if="
                            fields[key] && fields[key]['type'] == 'select'
                        "
                    >
                        <span>{{ fields[key]["title"] }}</span
                        >: {{ findObjFromOptions(key, item) }}
                    </div>

                    <div
                        class="resume-chips"
                        v-else-if="
                            fields[key] && fields[key]['type'] == 'chips'
                        "
                    >
                        <div class="resume-captions">
                            {{ fields[key]["title"] }}
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <template v-for="(skill, ind) in item" :key="ind">
                                <Chip :label="skill" />
                            </template>
                        </div>
                    </div>
                </template>
                <div>
                    <div class="resume-captions">
                        {{ fields['about']["title"] }}:
                    </div>
                    <div v-html="resumeDetail.about"></div>
                </div>
            </div>
            <div class="educations">
                <div
                    class="edu-item"
                    v-for="(edu, index) in resumeDetail.education"
                    :key="index"
                >
                    <template v-for="(item, key) in edu" :key="key">
                        <div class="resume-field" v-if="item !== null && fields[key] && (fields[key]['type'] != 'select' || key == 'faculty')">
                        <span>{{ fields[key]["title"] }}</span
                        >: {{ item }}
                        </div>

                        <div class="resume-field" v-else-if="item !== null && fields[key] && fields[key]['type'] == 'select'">
                        <span>{{ fields[key]["title"] }}</span
                        >: {{ findObjFromOptions(key, item) }}
                        </div>

                    </template>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { fields } from "@/fields.js";
import Image from "primevue/image";
import Chip from "primevue/chip";
import Button from "primevue/button";

export default {
    name: "ShowView",
    data() {
        return {
            fields: fields,
            statuses: {
                new: "Новое",
                interview: "Собеседование",
                adopted: "Отказ",
                refused: "Принят",
            },
        };
    },
    components: {
        Image,
        Chip,
        Button,
    },
    mounted() {
        this.$store.dispatch("GET_DETAIL_RESUME", this.$route.params.id);
    },

    methods: {
        findObjFromOptions(key, value) {
            let res = this.fields[key]["optionsList"].find(
                (el) => el.code == value
            );
            return res ? res.name : "Не определено";
        },
    },

    computed: {
        resumeDetail() {
            return this.$store.getters.RESUME_DETAIL;
        },
        status() {
            return this.statuses[this.resumeDetail.status];
        },
    },
};
</script>

<style scoped>
main {
    padding: 0 10em;
}
.resume {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2em;
}
.resume-field,
.resume-captions {
    color: var(--bluegray-700);
    font-size: 1.1em;
}
.resume-field span,
.resume-captions {
    font-weight: bold;
    color: var(--bluegray-700);
}
.resume-captions {
    margin-bottom: 0.5em;
}
.info {
    display: grid;
    gap: 1em;
    align-content: flex-start;
}
.flex {
    display: flex;
}
.gap-2 {
    gap: 1em;
}
.status_new {
    background: var(--blue-400);
}
.status_interview {
    background: var(--yellow-400);
}
.status_adopted {
    background: var(--red-400);
}
.status_refused {
    background: var(--green-500);
}
.status {
    position: absolute;
    top: 25%;
    right: 0;
    padding: 0.75em 1.5em;
    border-radius: 200px;
    font-weight: bold;
}
.header {
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 1em;
}
.educations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 1em;
    grid-column: 1/-1;
}
.edu-item {
    padding: 1em;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    display: grid;
    gap: .5em;
}
.flex-wrap {
    flex-wrap: wrap;
}
</style>

<style>
.photo img {
    object-fit: cover;
    object-position: center;
}
</style>
