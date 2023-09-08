<template>
    <div>
        <label for="education" class="form-label">Образование:</label>
        <select
            name="education"
            id="education"
            v-model="enterData.education"
            class="form-select"
        >
            <option
                :value="index"
                :key="index"
                v-for="(item, index) in educationList"
            >
                {{ item }}
            </option>
        </select>

        <input
            type="text"
            id="phone"
            v-model="enterData.phone"
            class="form-control"
        />

        <textarea
            id="aboutMe"
            v-model="enterData.aboutMe"
            class="form-control"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: "ResumeInput",
    components: {},
};
</script>
