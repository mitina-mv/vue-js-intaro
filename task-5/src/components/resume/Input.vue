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

    <input
        :type="inputType"
        :name="name"
        :id="name"
        v-model="inputValue"
        @input="setInputValue"
        class="form-control"
        v-else-if="type == 'input'"
    />

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
            class="form-select"
            v-model="moneyValue.units"
        >
            <option
                :value="index"
                :key="index"
                v-for="(item, index) in moneyUnits"
            >
                {{ item }}
            </option>
        </select>
    </div>

    <textarea
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', modelValue)"
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
    },
    emits: ["update:modelValue"],
    data() {
        return {
            moneyUnits: {
                rub: "Рубль",
                usd: 'Доллар США',
                eur: 'Евро'
            },
            moneyValue: {
                count: 0,
                units: 'rub'
            },
            inputValue: ''
        }
    }, 
    methods: {
        setInputValue(event) {
            if(this.inputType == 'file')
            {
                this.$emit('update:modelValue', URL.createObjectURL(event.target.files[0]))
            } else {
                this.$emit('update:modelValue', this.inputValue)
            }
        },
        // getPathPhoto() {
        //     if(this.inputType != 'file'){
        //         this.previewPath = null;
        //         return;
        //     }

        //     if(this.modelValue.name.includes(".png") ||
        //         this.modelValue.name.includes(".jpg")
        //     ) {
        //         this.$emit('update:modelValue', URL.createObjectURL(this.modelValue))
        //         // $emit('update:modelValue', URL.createObjectURL(this.modelValue))
        //     }
        // }
    }
};
</script>
