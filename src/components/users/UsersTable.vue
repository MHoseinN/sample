<template>
  <table>
    <thead>
      <tr>
        <th>نام</th>
        <th>ایمیل</th>
        <th>موبایل</th>
        <th>نقش</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in rows" :key="user.id">
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.mobile }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.status }}</td>
        <td class="actions">
          <button @click="$emit('view', user.id)">نمایش</button>
          <button @click="$emit('edit', user)">ویرایش</button>
          <button @click="$emit('delete', user.id)">حذف</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => []
  }
})

defineEmits(['view', 'edit', 'delete'])
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #e5e7eb;
  text-align: right;
  padding: 8px;
}

.actions {
  display: flex;
  gap: 6px;
}

button {
  border: 1px solid #ddd;
  background: #fff;
  padding: 4px 8px;
  cursor: pointer;
}
</style>
