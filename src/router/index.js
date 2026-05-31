import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReviewsView from '../views/ReviewsView.vue';
import ProfileView from '../views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/reviews', component: ReviewsView },
    { path: '/profile/:id', component: ProfileView },
  ],
});

export default router;
