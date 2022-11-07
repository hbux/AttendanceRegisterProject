import axios from 'axios'
import jwtDecode from 'jwt-decode'

import authenticationService from '../../services/authenticationService'

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

        return true;
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

        let isStudentRole = state.user.roles.filter(r => r.roleName === 'Student').length > 0;
        
        return state.user.access_token && state.user.username && isStudentRole;
    }
}

const actions = {
    async loginAction({dispatch }, data) {
        const response = await authenticationService.loginAsync(data);

        return dispatch('attempt', response.data);
    },
    async registerAction(_, data) {
        const response = await authenticationService.registerAsync(data);

        return response.data;
    },
    async attempt({ commit }, data) {
        let decodedJwt = jwtDecode(data.access_token);

        let user = {
            access_token: data.access_token,
            username: data.username,
            email: decodedJwt.email,
            id: decodedJwt.id,
            roles: decodedJwt.roles
        };

        console.log(user);

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

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token; 
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