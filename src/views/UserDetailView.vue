<template>
  <section>
    <h2>جزئیات کاربر</h2>

    <p v-if="usersStore.loading">در حال بارگذاری...</p>
    <p v-if="usersStore.error" class="error">{{ usersStore.error }}</p>

    <div v-if="user">
      <p><strong>نام:</strong> {{ user.firstName }} {{ user.lastName }}</p>
      <p><strong>ایمیل:</strong> {{ user.email }}</p>
      <p><strong>موبایل:</strong> {{ user.mobile }}</p>
      <p><strong>نقش:</strong> {{ user.role }}</p>
      <p><strong>وضعیت:</strong> {{ user.status }}</p>

      <h3>پروفایل</h3>
      <p v-if="profile"><strong>دپارتمان:</strong> {{ profile.department }}</p>
      <p v-if="profile"><strong>سمت:</strong> {{ profile.position }}</p>
      <p v-if="!profile">برای این کاربر پروفایلی ثبت نشده است.</p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProfileByUserIdApi } from '../api/profiles.api'
import { useUsersStore } from '../stores/users.store'

const route = useRoute()
const usersStore = useUsersStore()
const profile = ref(null)

const user = computed(() => usersStore.selectedUser)

onMounted(async () => {
  const id = Number(route.params.id)
  await usersStore.fetchUserById(id)
  profile.value = await getProfileByUserIdApi(id)
})
</script>

<style scoped>
.error {
  color: #b91c1c;
}
</style>
