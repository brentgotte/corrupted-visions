import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Review from '../views/ReviewsView.vue'
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
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
