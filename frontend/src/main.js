import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router'
import store from './stores/authenticationStore'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')