import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createUserApi, deleteUserApi, getUserByIdApi, getUsersApi, updateUserApi } from '../api/users.api'

export const useUsersStore = defineStore('users', () => {
  const items = ref([])
  const selectedUser = ref(null)
  const loading = ref(false)
  const error = ref('')

  const total = computed(() => items.value.length)

  const fetchUsers = async () => {
    loading.value = true
    error.value = ''

    try {
      items.value = await getUsersApi()
    } catch (err) {
      error.value = err?.message || 'خطا در دریافت کاربران'
    } finally {
      loading.value = false
    }
  }

  const fetchUserById = async (id) => {
    loading.value = true
    error.value = ''

    try {
      selectedUser.value = await getUserByIdApi(id)
      return selectedUser.value
    } catch (err) {
      error.value = err?.message || 'خطا در دریافت کاربر'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (payload) => {
    loading.value = true
    error.value = ''

    try {
      const created = await createUserApi(payload)
      items.value = [created, ...items.value]
      return created
    } catch (err) {
      error.value = err?.message || 'خطا در ایجاد کاربر'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    loading.value = true
    error.value = ''

    try {
      const updated = await updateUserApi(id, payload)
      items.value = items.value.map((item) => (item.id === id ? updated : item))
      if (selectedUser.value?.id === id) {
        selectedUser.value = updated
      }
      return updated
    } catch (err) {
      error.value = err?.message || 'خطا در ویرایش کاربر'
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeUser = async (id) => {
    loading.value = true
    error.value = ''

    try {
      await deleteUserApi(id)
      items.value = items.value.filter((item) => item.id !== id)
      if (selectedUser.value?.id === id) {
        selectedUser.value = null
      }
    } catch (err) {
      error.value = err?.message || 'خطا در حذف کاربر'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    selectedUser,
    loading,
    error,
    total,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    removeUser
  }
})
