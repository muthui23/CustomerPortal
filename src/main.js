import './assets/main.css'
import vuetify from './plugins/vuetify'
import 'leaflet/dist/leaflet.css'


// import VOtpInput from 'vue3-otp-input'
// app.component('v-otp-input', VOtpInput)


import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)


app.mount('#app')
