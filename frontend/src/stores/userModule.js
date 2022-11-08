import axios from 'axios'

import userEndpoint from '../endpoints/userEndpoint';

const user = JSON.parse(localStorage.getItem('user'));

const state = {
    user: user
}

const getters = {
    isAuthenticated(state) {
        if (!state.user) {
            return false;
        }

        if (!state.user.access_token || !state.user.username) {
            return false;
        }

        return true
    },
    username(state) {
        if (!state.user) {
            return null;
        }

        return state.user.username;
    },
    isInStudentRole(state) {
        if (!state.user) {
            return false;
        }

        let isStudentRole = state.user.roles.filter(r => r === 'Student').length > 0;
        
        return state.user.access_token && state.user.username && isStudentRole;
    },
    isInTutorRole(state) {
        if (!state.user) {
            return false;
        }

        let isInTutorRole = state.user.roles.filter(r => r === 'Tutor' || r === 'Module leader');

        return state.user.access_token && state.user.username && isInTutorRole;
    }
}

const actions = {
    async loginAction({dispatch }, data) {
        const response = await userEndpoint.loginAsync(data);

        return dispatch('attempt', response.data);
    },
    async registerAction(_, data) {
        const response = await userEndpoint.registerAsync(data);

        return response.data;
    },
    async attempt({ commit }, data) {
        let user = {
            access_token: data.access_token,
            username: data.username
        };

        commit('SET_USER', user);
    },
    logoutAction({ commit }) {
        commit('REMOVE_USER');
    }
}

const mutations = {
    SET_USER(state, user) {
        state.user = user;

        localStorage.setItem('user', JSON.stringify(user));
    },
    REMOVE_USER(state) {
        state.user = null;

        localStorage.removeItem('user');

        axios.defaults.headers.common['Authorization'] = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions, 
    mutations
}