<template>
  <section>
    <h2>داشبورد</h2>
    <p v-if="authStore.user">
      خوش آمدی {{ authStore.user.firstName }} {{ authStore.user.lastName }}
    </p>
    <p>از منوی بالا می‌توانید کاربران را مدیریت کنید.</p>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  authStore.hydrateUser()
})
</script>
