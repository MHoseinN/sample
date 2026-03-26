<template>
  <div class="app-shell">
    <header class="topbar">
      <h1>سامانه مدیریت کاربران سازمان</h1>
      <nav>
        <RouterLink to="/dashboard">داشبورد</RouterLink>
        <RouterLink to="/users">کاربران</RouterLink>
        <RouterLink to="/profile">پروفایل من</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login">ورود</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/register">ثبت‌نام</RouterLink>
        <button v-if="authStore.isAuthenticated" @click="onLogout">خروج</button>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const onLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #1f2937;
}

button {
  border: 1px solid #ddd;
  background: white;
  padding: 6px 10px;
  cursor: pointer;
}

.content {
  margin-top: 20px;
}
</style>
