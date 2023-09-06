const app = Vue.createApp({
    data() {
        return {
            profession: "",
            city: "",
            photo: "",
            fullName: "",
            phone: "",
            email: "",
            birthdate: "",
            education: "",
            desiredSalary: "",
            skills: "",
            aboutMe: "",
            educationList: {
                middle: 'Среднее',
                middleSpec: 'Среднее специальное',
                semiHigh: 'Неоконченное высшее',
                universe: 'Высшее'
            },
            eduDetail: {
                institution: {
                    title: "Учебное заведение",
                    value: ""
                },
                faculty: {
                    title: "Факультет",
                    value: ""
                },
                specialization: {
                    title: "Специальность",
                    value: ""
                },
                endYear: {
                    title: "Год окончания",
                    value: "",
                    type: "number"
                },
            },
            showResumeFlag: false
            
        };
    },

    mounted() {},

    methods: {
        showResume(event) {
            this.showResumeFlag = true
        }
    },

    computed: {
        getProfession() {
            return this.profession + ' бла-бла'
        }
    }
});

app.mount("#app");
