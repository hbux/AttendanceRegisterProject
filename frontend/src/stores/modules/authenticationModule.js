import axios from 'axios'

const apiUrl = 'http://localhost:3000/authentication/';
const user = JSON.parse(localStorage.getItem('user'));

const state = {
    user: user
}

const getters = {
    isAuthenticated(state) {
        if (!state.user) {
            return false;
        }

        return state.user.access_token && state.user.username;
    },
    username(state) {
        if (!state.user) {
            return null;
        }

        return state.user.username;
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions, 
    mutations
}