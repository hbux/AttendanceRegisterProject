import { createStore } from 'vuex';

import userModule from './userModule';

const store = createStore({
    modules: {
        userModule
    }
})

export default store;