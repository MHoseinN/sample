<template>
  <section class="card">
    <h2>ثبت‌نام</h2>

    <form @submit.prevent="onSubmit" class="form">
      <input v-model="form.firstName" type="text" placeholder="نام" required />
      <input v-model="form.lastName" type="text" placeholder="نام خانوادگی" required />
      <input v-model="form.email" type="email" placeholder="ایمیل" required />
      <input v-model="form.mobile" type="text" placeholder="موبایل" required />
      <input v-model="form.password" type="password" placeholder="رمز عبور" required />

      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
      </button>
    </form>

    <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await authStore.register(form)
    router.push('/dashboard')
  } catch (err) {
    return
  }
}
</script>

<style scoped>
.card {
  max-width: 520px;
}

.form {
  display: grid;
  gap: 10px;
}

input,
button {
  border: 1px solid #ddd;
  padding: 8px;
}

.error {
  color: #b91c1c;
}
</style>
