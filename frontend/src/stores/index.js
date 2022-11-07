import { createStore } from 'vuex';

import authenticationModule from './modules/authenticationModule';

// Create store
const store = createStore({
    modules: {
        authenticationModule
    }
})

export default store;