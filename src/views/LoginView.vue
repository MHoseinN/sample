<template>
  <section>
    <h2> login </h2>

    <form @submit.prevent="onSubmit">
      <input v-model="form.emailOrMobile" type="text" placeholder="username" required>
      <input v-model="form.password" type="password" placeholder="password" required>
      <button type="submit" :disabled="authStore.loading">{{ authStore.loading ? 'در حال ورود' : "ورود" }}</button>
    </form>

    <p v-if="authStore.error">{{ authStore.error }} </p>

  </section>
</template>

<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  emailOrMobile: '',
  password: ''
})

const onSubmit = async () => {
  try {
    await authStore.login(form)

    const redirect = route.query.redirect
    if (typeof redirect === "string" && redirect.length > 0) {
      router.push(redirect)
    }
    else {
      router.push("/dashboard")
    }
  }
  catch (err) {
    return
  }
}


</script>