import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api'
})

const app = createApp()

app.config.globalProperties.$axios = axiosInstance
import router from './router'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "../src/assets/styles/main.scss"

import store from './store'
import './registerServiceWorker'
createApp(App).use(store).use(router).mount('#app')
