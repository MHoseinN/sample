import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchMeApi, loginApi, registerApi } from '../api/auth.api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('authUser') || 'null'))
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  const persistSession = (sessionToken, sessionUser) => {
    token.value = sessionToken
    user.value = sessionUser
    localStorage.setItem('token', sessionToken)
    localStorage.setItem('authUser', JSON.stringify(sessionUser))
  }

  const clearSession = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('authUser')
  }

  const login = async (payload) => {
    loading.value = true
    error.value = ''

    try {
      const result = await loginApi(payload)
      persistSession(result.token, result.user)
      return result.user
    } catch (err) {
      error.value = err?.message || 'خطا در ورود'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (payload) => {
    loading.value = true
    error.value = ''

    try {
      const result = await registerApi(payload)
      persistSession(result.token, result.user)
      return result.user
    } catch (err) {
      error.value = err?.message || 'خطا در ثبت‌نام'
      throw err
    } finally {
      loading.value = false
    }
  }

  const hydrateUser = async () => {
    if (!user.value?.id) {
      return
    }

    try {
      const latest = await fetchMeApi(user.value.id)
      user.value = latest
      localStorage.setItem('authUser', JSON.stringify(latest))
    } catch (err) {
      clearSession()
    }
  }

  const logout = async () => {
    clearSession()
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    hydrateUser,
    logout
  }
})
