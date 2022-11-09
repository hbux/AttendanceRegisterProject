import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './stores/index'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(Router).use(Store).mount('#app')