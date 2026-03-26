<template>
  <section>
    <h2>مدیریت کاربران</h2>

    <UserFilters
      :search="search"
      :role="selectedRole"
      :status="selectedStatus"
      @update:search="(value) => (search = value)"
      @update:role="(value) => (selectedRole = value)"
      @update:status="(value) => (selectedStatus = value)"
    />

    <button class="toggle-btn" @click="toggleCreateForm">
      {{ showCreateForm ? 'بستن فرم' : 'ایجاد کاربر جدید' }}
    </button>

    <UserForm
      v-if="showCreateForm"
      :submit-label="editingUser ? 'ذخیره تغییرات' : 'ایجاد کاربر'"
      :model-value="editingUser"
      @submit="onSubmitUser"
      @cancel="onCancelEdit"
    />

    <p>تعداد کاربران: {{ filteredUsers.length }} از {{ usersStore.total }}</p>
    <p v-if="usersStore.loading">در حال بارگذاری...</p>
    <p v-if="usersStore.error" class="error">{{ usersStore.error }}</p>

    <UsersTable
      :rows="filteredUsers"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserFilters from '../components/users/UserFilters.vue'
import UserForm from '../components/users/UserForm.vue'
import UsersTable from '../components/users/UsersTable.vue'
import { useUsersStore } from '../stores/users.store'

const router = useRouter()
const usersStore = useUsersStore()

const search = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')

const showCreateForm = ref(false)
const editingUser = ref(null)

const filteredUsers = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase()

  return usersStore.items.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const matchSearch =
      !normalizedSearch ||
      fullName.includes(normalizedSearch) ||
      user.email?.toLowerCase().includes(normalizedSearch) ||
      user.mobile?.toLowerCase().includes(normalizedSearch)

    const matchRole = !selectedRole.value || user.role === selectedRole.value
    const matchStatus = !selectedStatus.value || user.status === selectedStatus.value

    return matchSearch && matchRole && matchStatus
  })
})

let debounceTimer = null

watch([search, selectedRole, selectedStatus], () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    void usersStore.fetchUsers()
  }, 300)
})

onMounted(() => {
  usersStore.fetchUsers()
})

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value
  if (!showCreateForm.value) {
    editingUser.value = null
  }
}

const onSubmitUser = async (payload) => {
  if (editingUser.value?.id) {
    await usersStore.updateUser(editingUser.value.id, payload)
  } else {
    await usersStore.createUser(payload)
  }

  showCreateForm.value = false
  editingUser.value = null
}

const onEdit = (user) => {
  editingUser.value = user
  showCreateForm.value = true
}

const onCancelEdit = () => {
  editingUser.value = null
  showCreateForm.value = false
}

const onDelete = async (id) => {
  await usersStore.removeUser(id)
}

const onView = (id) => {
  router.push(`/users/${id}`)
}
</script>

<style scoped>
.toggle-btn {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 6px 12px;
  cursor: pointer;
}

.error {
  color: #b91c1c;
}
</style>
