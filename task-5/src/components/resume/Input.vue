<template>
    <label :for="name" class="form-label">{{ caption }}:</label>
    <select
        :name="name"
        :id="name"
        @input="$emit('update:modelValue', $event.target.value)"
        class="form-select"
        v-if="type == 'select'"
        :value="modelValue"
    >
        <option
            :value="index"
            :key="index"
            v-for="(item, index) in optionsList"
        >
            {{ item }}
        </option>
    </select>

    <template v-else-if="type == 'input'">
        <input
            :type="inputType"
            :name="name"
            :id="name"
            v-model="inputValue"
            @input="setInputValue"
            class="form-control"
        />
        <div
            class="invalid-feedback invalid-display"
            v-show="validatePhone && inputType == 'tel'"
        >
            {{ validatePhone }}
        </div>
    </template>

    <div class="d-flex" v-else-if="type == 'money'">
        <input
            type="number"
            :name="name"
            :id="name"
            v-model="moneyValue.count"
            @input="$emit('update:modelValue', moneyValue)"
            class="form-control"
        />
        <select
            :name="name + '_units'"
            :id="name + '_units'"
            @input="$emit('update:modelValue', moneyValue)"
            v-model="moneyValue.units"
            class="form-select"
        >
            <option
                :value="item"
                :key="index"
                v-for="(item, index) in moneyUnits"
            >
                {{ item }}
            </option>
        </select>
    </div>

    <div class="d-flex" v-else-if="type == 'find-select'">
        <input
            type="text"
            :name="'find_' + name"
            @input="$emit('update:findValue', $event.target.value)"
            :value="findValue"
            class="form-control"
        />
        <select
            :name="name"
            :id="name"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form-select"
            :value="modelValue"
        >
            <option
                :value="index"
                :key="index"
                v-for="(item, index) in optionsList"
            >
                {{ item }}
            </option>
        </select>
    </div>

    <textarea
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-else-if="type == 'textarea'"
        class="form-control"
    ></textarea>
</template>

<script>
export default {
    name: "ResumeInput",
    components: {},
    props: {
        type: {
            type: String,
            required: true,
            default: "input",
        },
        name: String,
        caption: String,
        inputType: {
            type: String,
            required: false,
            default: "text",
        },
        optionsList: {
            type: Object,
            required: false,
        },
        enterData: String,
        modelValue: {
            required: false,
        },
        findValue: {
            required: false,
        },
    },
    emits: ["update:modelValue", "update:findValue"],
    data() {
        return {
            moneyUnits: {
                rub: "Рубль",
                usd: "Доллар США",
                eur: "Евро",
            },
            moneyValue: {
                count: 0,
                units: "Рубль",
            },
            inputValue: "",
        };
    },
    methods: {
        setInputValue(event) {
            if (this.inputType == "file") {
                this.$emit(
                    "update:modelValue",
                    URL.createObjectURL(event.target.files[0])
                );
            } else {
                this.$emit("update:modelValue", this.inputValue);
            }
        },
    },

    computed: {
        validatePhone() {
            const phoneNumberPattern = /^[0-9]{6,10}$/;

            if (phoneNumberPattern.test(this.inputValue)) {
                return "";
            } else {
                return "Номер телефона должен состоять из 6-10 цифр.";
            }
        },
    },
};
</script>

<style scoped>
.invalid-display {
    display: block;
}
</style>
