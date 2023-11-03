/* eslint-disable */
import { createStore } from "vuex";
import axios from 'axios';

export const store = createStore({
    state() {
        return {
            resumes: null,
        };
    },
    getters: {
        RESUMES: state => {
            return state.resumes;
        },
    },
    mutations: {
        SET_RESUME: (state, payload) => {
            state.resumes = payload;
        },
    
        ADD_RESUME: (state, payload) => {
            state.resumes.push(payload);
        },
    },
    actions: {
        GET_RESUME: async (context, payload) => {
            let {data} = await axios.get('http://localhost:8000/api/cv');
            context.commit('SET_RESUME', data.items);
        },
    
        SAVE_RESUME: async (context, payload) => {
            let {data} = await axios.post('http://localhost:8000/api/cv', payload);
            context.commit('ADD_RESUME', data);
        },
    },
});
