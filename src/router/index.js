import { useAuthStore } from "@/stores/auth.store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/UsersListView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/users/:id",
    name: "user-detail",
    component: () => import("../views/UserDetailView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/MyProfileView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }

  if (
    (to.path === "/login" || to.path === "/register") &&
    authStore.isAuthenticated
  ) {
    return "/dashboard";
  }

  return true
});

export default router;
