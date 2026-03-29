<template>
  <div>
    <header>
      <h1>سازمان مدیریت پرسنل</h1>
      <nav>
        <router-link to="/about">درباره ما</router-link>
        <router-link to="/dashboard">داشبورد</router-link>
        <router-link to="/users">کاربران</router-link>
        <router-link to="/profile">پروفایل من</router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/login">ورود</router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/register">ثبت نام</router-link>

        <span v-if="authStore.user">   با تقش{{ authStore.user?.role}} {{ authStore.user?.firstName}}خوش اومدی</span>
        <button v-if="authStore.isAuthenticated" @click="onLogOut">خروج</button>
      </nav>
    </header>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore  } from './stores/auth.store';
import { useRouter  , RouterLink , RouterView} from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const onLogOut =async()=>{
  const confirm = window.confirm('u sure?')
  if(confirm){
    await authStore.logOut()
    router.push("/login")
  }
}

</script>