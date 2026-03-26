<template>
  <section class="filters">
    <input v-model="localSearch" type="text" placeholder="جستجو: نام، ایمیل، موبایل" />

    <select v-model="localRole">
      <option value="">همه نقش‌ها</option>
      <option value="admin">admin</option>
      <option value="operator">operator</option>
      <option value="viewer">viewer</option>
    </select>

    <select v-model="localStatus">
      <option value="">همه وضعیت‌ها</option>
      <option value="active">active</option>
      <option value="inactive">inactive</option>
      <option value="suspended">suspended</option>
    </select>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  search: { type: String, default: '' },
  role: { type: String, default: '' },
  status: { type: String, default: '' }
})

const emit = defineEmits(['update:search', 'update:role', 'update:status'])

const localSearch = ref(props.search)
const localRole = ref(props.role)
const localStatus = ref(props.status)

watch(localSearch, (value) => emit('update:search', value))
watch(localRole, (value) => emit('update:role', value))
watch(localStatus, (value) => emit('update:status', value))
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

input,
select {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
