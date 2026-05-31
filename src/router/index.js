import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Review from '../views/ReviewsView.vue'
import Scanner from '../components/qrscanner.vue'
import Profile from '../views/ProfileView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/reviews',
        name: 'Reviews',
        component: Review
    },
      { path: '/scanner',
        name: 'Scanner', 
        component: Scanner },

           {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
