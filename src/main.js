import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')

fetch('http://localhost:3000/api/profile/1daaedd7-d766-4b57-b64c-e8627c978519')
  .then(res => res.json())
  .then(data => console.log('Profile:', data));