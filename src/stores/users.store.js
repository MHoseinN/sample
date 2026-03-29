import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  getUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  getUserByIdApi,
} from "@/api/users.api";

export const useUsersStore = defineStore("users", () => {
  const items = ref([]);
  const selectedUser = ref(null);
  const loading = ref(false);
  const error = ref("");

  const total = computed(() => items.value.length);

  const fetchUsers = async () => {
    loading.value = true;
    error.value = "";

    try {
      items.value = await getUsersApi();
    } catch (err) {
      error.value = err?.message || "error";
    } finally {
      loading.value = false;
    }
  };

  const fetchUserById = async (userId) => {
    loading.value = true;
    error.value = "";

    try {
      selectedUser.value = await getUserByIdApi(userId);
      return selectedUser.value;
    } catch (err) {
      error.value = err?.message || "error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createUser = async (payload) => {
    loading.value = true;
    error.value = "";

    try {
      const created = await createUserApi(payload);
      items.value = [created, ...items.value];
      return created;
    } catch (err) {
      error.value = err?.message || "error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (userId, payload) => {
    loading.value = true;
    error.value = "";

    try {
      const updated = await updateUserApi({ id: userId, payload });
      items.value = items.value.map((item) =>
        item.id === userId ? updated : item
      );
      if (selectedUser.value?.id === userId) {
        selectedUser.value = updated;
      }
      return updated;
    } catch (err) {
      error.value = err?.message || "error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeUser = async (userId) => {
    loading.value = true;
    error.value = "";
    try {
      await deleteUserApi(userId);
      items.value = items.value.filter((item) => item.id !== userId)
      if (selectedUser.value?.id === userId) {
        selectedUser.value = null;
      }
    } catch (err) {
      error.value = err?.message || "error";
      throw err
    } finally {
      loading.value = false;
    }
  };
  return{
    items,
    selectedUser,
    loading,
    error,
    total,
    fetchUsers,
    fetchUserById,
    createUser,
    removeUser,
    updateUser
  }
});
