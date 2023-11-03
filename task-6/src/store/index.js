/* eslint-disable */
import { createStore } from "vuex";
import axios from "axios";

export const store = createStore({
    state() {
        return {
            resumes: null,
            new: null,
            interview: null,
            adopted: null,
            refused: null,
        };
    },
    getters: {
        RESUMES: (state) => {
            return state.resumes;
        },
        NEW: (state) => {
            return state.new;
        },
        INTERVIEW: (state) => {
            return state.interview;
        },
        ADOPTED: (state) => {
            return state.adopted;
        },
        REFUSED: (state) => {
            return state.refused;
        },
    },
    mutations: {
        SET_RESUME: (state, payload) => {
            state.resumes = payload;
        },

        ADD_RESUME: (state, payload) => {
            state.resumes.push(payload);
        },
        SET_NEW: (state, payload) => {
            state.new = payload;
        },

        ADD_NEW: (state, payload) => {
            state.new.push(payload);
        },
        SET_INTERVIEW: (state, payload) => {
            state.interview = payload;
        },

        ADD_INTERVIEW: (state, payload) => {
            state.interview.push(payload);
        },
        SET_ADOPTED: (state, payload) => {
            state.adopted = payload;
        },

        ADD_ADOPTED: (state, payload) => {
            state.adopted.push(payload);
        },
        SET_REFUSED: (state, payload) => {
            state.refused = payload;
        },

        ADD_REFUSED: (state, payload) => {
            state.refused.push(payload);
        },
    },
    actions: {
        GET_RESUME: async (context, payload) => {
            let { data } = await axios.get("http://localhost:8000/api/cv");
            context.commit("SET_RESUME", data.items);

            // let statuslist = {
            //     new: [],
            //     interview: [],
            //     adopted: [],
            //     refused:[]
            // }

            // for(let key in data)
            // {
            //     let item = data[key];
            //     statuslist[item.status].push(item);
            // }
            
            // context.commit("SET_NEW", statuslist.new);
            // context.commit("SET_INTERVIEW", statuslist.interview);
            // context.commit("SET_ADOPTED", statuslist.adopted);
            // context.commit("SET_REFUSED", statuslist.refused);
        },

        SAVE_RESUME: async (context, payload) => {
            let { data } = await axios.post(
                "http://localhost:8000/api/cv",
                payload
            );
            context.commit("ADD_RESUME", data);
        },

        UPDATE_STATUS_RESUME: async (context, payload) => {
            let { data } = await axios.post(
                "http://localhost:8000/api/cv/" + payload.id + "/status",
                payload
            );
            context.commit("ADD_RESUME", data);
        },
    },
});
