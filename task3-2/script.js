const app = Vue.createApp({
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
                desiredSalary: "",
                skills: "",
                aboutMe: "",
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
            },
            resumeData: {
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
                institution: "",
                faculty: "",
                specialization: "",
                endYear: "",
            },
            educationList: {
                middle: "Среднее",
                middleSpec: "Среднее специальное",
                semiHigh: "Неоконченное высшее",
                universe: "Высшее",
            },
            fields: {
                profession: {
                    title: "Профессия",
                },
                city: {
                    title: "Город",
                },
                photo: {
                    title: "Фото",
                    type: 'image'
                },
                fullName: {
                    title: "ФИО",
                },
                phone: {
                    title: "Телефон",
                },
                email: {
                    title: "Email",
                },
                birthdate: {
                    title: "Дата рождения",
                },
                education: {
                    title: "Образование",
                },
                desiredSalary: {
                    title: "Желаемая зарплата",
                },
                skills: {
                    title: "Ключевые навыки",
                },
                aboutMe: {
                    title: "О себе",
                },
            },

            eduDetailFields: {
                institution: {
                    title: "Учебное заведение",
                },
                faculty: {
                    title: "Факультет",
                },
                specialization: {
                    title: "Специальность",
                },
                endYear: {
                    title: "Год окончания",
                    type: "number",
                },
            },

            showResumeFlag: false,
        };
    },

    mounted() {},

    methods: {
        showResume() {
            this.showResumeFlag = true;

            for (let key in this.enterData) {
                this.resumeData[key] = this.enterData[key];

                if (key == "education") {
                    this.resumeData[key] =
                        this.educationList[this.enterData[key]];
                }
            }
        },
    },

    computed: {
        getProfession() {
            return this.profession + " бла-бла";
        },
        validatePhone() {
            const phoneNumberPattern = /^[0-9]{6,10}$/;

            if (phoneNumberPattern.test(this.enterData.phone)) {
                return "";
            } else {
                return "Номер телефона должен состоять из 6-10 цифр.";
            }
        },
    },
});

app.mount("#app");
