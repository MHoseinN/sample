<template>
  <section class="card">
    <h2>ورود</h2>

    <form @submit.prevent="onSubmit" class="form">
      <input v-model="form.emailOrMobile" type="text" placeholder="ایمیل یا موبایل" required />
      <input v-model="form.password" type="password" placeholder="رمز عبور" required />
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'در حال ورود...' : 'ورود' }}
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
  emailOrMobile: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await authStore.login(form)
    router.push('/dashboard')
  } catch (err) {
    return
  }
}
</script>

<style scoped>
.card {
  max-width: 420px;
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
