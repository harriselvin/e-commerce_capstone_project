import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(store)
app.use(router)
app.use(VueCookies, { expires: '1h' })
app.mount('#app')
