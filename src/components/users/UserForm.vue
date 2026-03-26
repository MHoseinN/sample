<template>
  <form class="form" @submit.prevent="onSubmit">
    <input v-model="form.firstName" type="text" placeholder="نام" required />
    <input v-model="form.lastName" type="text" placeholder="نام خانوادگی" required />
    <input v-model="form.email" type="email" placeholder="ایمیل" required />
    <input v-model="form.mobile" type="text" placeholder="موبایل" required />
    <input v-model="form.password" type="password" placeholder="رمز عبور" required />

    <select v-model="form.role" required>
      <option value="admin">admin</option>
      <option value="operator">operator</option>
      <option value="viewer">viewer</option>
    </select>

    <select v-model="form.status" required>
      <option value="active">active</option>
      <option value="inactive">inactive</option>
      <option value="suspended">suspended</option>
    </select>

    <div class="actions">
      <button type="submit">{{ submitLabel }}</button>
      <button type="button" @click="$emit('cancel')">انصراف</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: 'ثبت'
  }
})

const emit = defineEmits(['submit', 'cancel'])

const getInitialState = () => ({
  firstName: props.modelValue?.firstName || '',
  lastName: props.modelValue?.lastName || '',
  email: props.modelValue?.email || '',
  mobile: props.modelValue?.mobile || '',
  password: props.modelValue?.password || '',
  role: props.modelValue?.role || 'viewer',
  status: props.modelValue?.status || 'active'
})

const form = reactive(getInitialState())

watch(
  () => props.modelValue,
  () => Object.assign(form, getInitialState()),
  { deep: true }
)

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

input,
select {
  border: 1px solid #ddd;
  padding: 8px;
}

.actions {
  grid-column: span 2;
  display: flex;
  gap: 8px;
}

button {
  border: 1px solid #ddd;
  background: #fff;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
