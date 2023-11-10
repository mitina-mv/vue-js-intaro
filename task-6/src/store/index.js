/* eslint-disable */
import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
    state() {
        return {
            resumes: null,
            resumeDetail: {
                profession: null,
                full_name: null,
                city: null,
                photo_path: null,
                phone: null,
                email: null,
                birthdate: null,
                salary: null,
                skills: null,
                work_schedule: null,
                about: null,
                education: [
                    {
                        level: null,
                        specialization: null,
                        institution: null,
                        faculty: null,
                        end_year: null,
                    }
                ],
            },
            errors: []
        };
    },
    getters: {
        RESUMES: (state) => {
            return state.resumes;
        },
        RESUME_DETAIL: (state) => {
            return state.resumeDetail;
        },
        ERRORS: (state) => {
            return state.errors;
        },
    },
    mutations: {
        SET_RESUME: (state, payload) => {
            state.resumes = payload;
        },
        SET_ERRORS: (state, payload) => {
            state.errors = payload;
        },
        ADD_RESUME: (state, payload) => {
            state.resumes.push(payload);
        },
        REMOVE_RESUME: (state, id) => {
            state.resumes = state.resumes.filter((item) => item.id != id);
        },
        NULLABLE_RESUME_DETAIL: (state) => {
            state.resumeDetail = {
                profession: null,
                full_name: null,
                city: null,
                photo_path: null,
                phone: null,
                email: null,
                birthdate: null,
                salary: null,
                skills: null,
                work_schedule: null,
                about: null,
                education: [
                    {
                        level: null,
                        specialization: null,
                        institution: null,
                        faculty: null,
                        end_year: null,
                    }
                ],
            }
        },
        SET_RESUME_DETAIL: (state, payload) => {
            state.resumeDetail = payload;
        },
        ADD_EDUCATION_TO_RESUME_DETAIL: (state, payload) => {
            state.resumeDetail.education.push(payload);
        },
    },
    actions: {
        GET_RESUME: async (context, payload) => {
            let { data } = await axios.get("http://localhost:8000/api/cv");
            context.commit("SET_RESUME", data.items);
        },

        GET_DETAIL_RESUME: async (context, payload) => {
            let { data } = await axios.get("http://localhost:8000/api/cv/" + payload.element.id);
            context.commit("SET_RESUME_DETAIL", data);
        },

        SAVE_RESUME: async (context, payload) => {
            await axios.post(
                "http://localhost:8000/api/cv",
                payload
            )
            .then(response => {
                context.commit("ADD_RESUME", payload);
            })
            .catch(error => {
                context.commit("SET_ERRORS", error.response.data.errors);
            });
        },

        UPDATE_STATUS_RESUME: async (context, payload) => {
            context.commit("REMOVE_RESUME", payload.element.id);
            payload.element.status = payload.status;
            context.commit("ADD_RESUME", payload.element);

            await axios.post(
                "http://localhost:8000/api/cv/" + payload.element.id + "/status",
                {
                    id: payload.element.id,
                    status: payload.status
                }
            );
        },
        UPDATE_RESUME: async (context, payload) => {

            await axios.post(
                "http://localhost:8000/api/cv/" + payload.element.id, payload.element
            );
        },
    },
});
