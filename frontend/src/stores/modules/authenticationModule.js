import axios from 'axios'

const apiUrl = 'http://localhost:3000/authentication/';

const state = {
    access_token: null,
    username: null
}

const getters = {
    isAuthenticated(state) {
        return state.access_token && state.username;
    },
    username(state) {
        return state.username;
    }
}

const actions = {
    async loginAction({dispatch }, data) {
        let urlTarget = apiUrl + 'login';

        const response = await axios.post(urlTarget, data);

        return dispatch('attempt', response.data);
    },
    async attempt({ commit }, data) {
        let user = {
            access_token: data.access_token,
            username: data.username
        }
        
        commit('SET_USER', user);
    }
}

const mutations = {
    SET_USER(state, user) {
        state.access_token = user.access_token;
        state.username = user.username;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions, 
    mutations
}