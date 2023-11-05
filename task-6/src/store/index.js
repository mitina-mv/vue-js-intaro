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
            }
        };
    },
    getters: {
        RESUMES: (state) => {
            return state.resumes;
        },
        RESUME_DETAIL: (state) => {
            return state.resumeDetail;
        },
    },
    mutations: {
        SET_RESUME: (state, payload) => {
            state.resumes = payload;
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

        SAVE_RESUME: async (context, payload) => {
            let { data } = await axios.post(
                "http://localhost:8000/api/cv",
                payload
            );
            context.commit("ADD_RESUME", data);
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
    },
});
