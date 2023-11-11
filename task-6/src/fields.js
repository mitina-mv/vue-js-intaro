export const fields = {
    profession: {
        title: "Профессия",
        type: "text",
    },
    full_name: {
        title: "ФИО",
        type: "text",
    },
    city: {
        title: "Город",
        type: "filter-select",
        optionsList: [],
        default: "0",
    },    
    birthdate: {
        title: "Дата рождения",
        type: "date",
    },  
    phone: {
        title: "Телефон",
        type: "mask",
        mask: "+7 (999) 999-99-99",
    },
    email: {
        title: "Email",
        type: "email",
    },
    photo_path: {
        title: "Ссылка на фото",
        type: "text",
        outerType: "image",
    },
    salary: {
        title: "Желаемая зарплата",
        type: "money",
    },
    work_schedule: {
        title: "График работы",
        type: "select",
        optionsList: [
            {
                name: "Полный день",
                code: "full",
            },
            {
                name: "Гибкий график",
                code: "flexible",
            },
            {
                name: "Сменный график",
                code: "shift",
            },
            {
                name: "Удаленная работа",
                code: "remote",
            },
            {
                name: "Вахтовый метод",
                code: "watch",
            },
        ],
        default: "full",
    },    
    skills: {
        title: "Ключевые навыки",
        type: "chips",
    },
    about: {
        title: "О себе",
        type: "editor",
    },
    level: {
        title: "Образование",
        type: "select",
        optionsList: [
            {
                name: "Среднее",
                code: "middle",
            },
            {
                name: "Среднее специальное",
                code: "middleSpec",
            },
            {
                name: "Неоконченное высшее",
                code: "semiHigh",
            },
            {
                name: "Высшее",
                code: "universe",
            },
        ],
        default: "middle",
    },
    institution: {
        title: "Учебное заведение",
        type: "filter-select",
        optionsList: []
    },
    faculty: {
        title: "Факультет",
        type: "select",
        optionsList: []
    },
    specialization: {
        title: "Специальность",
        type: "text",
    },
    end_year: {
        title: "Год окончания",
        type: "year",
    },
}