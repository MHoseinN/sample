<template>
  <section>
    <h2>پروفایل من</h2>

    <p v-if="!authStore.user">کاربر لاگین نشده است.</p>

    <div v-else>
      <p><strong>نام:</strong> {{ authStore.user.firstName }} {{ authStore.user.lastName }}</p>
      <p><strong>ایمیل:</strong> {{ authStore.user.email }}</p>
      <p><strong>موبایل:</strong> {{ authStore.user.mobile }}</p>
      <p><strong>نقش:</strong> {{ authStore.user.role }}</p>
      <p><strong>وضعیت:</strong> {{ authStore.user.status }}</p>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()
</script>
