import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { loginApi, registerApi, fetchMeApi } from "@/api/auth.api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const user = ref(JSON.parse(localStorage.getItem("authUser")) || null);
  const loading = ref(false);
  const error = ref("");

  const isAuthenticated = computed(() => !!token.value);

  const parsistSession = (sessionToken, sessionUser) => {
    token.value = sessionToken;
    user.value = sessionUser;
    localStorage.setItem("token", sessionToken);
    localStorage.setItem("authUser", JSON.stringify(sessionUser));
  };

  const clearSession = () => {
    token.value = "";
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    localStorage.removeItem("user");
  };

  const login = async (payload) => {
    loading.value = true;
    error.value = "";

    try {
      const res = await loginApi(payload);
      parsistSession(res.token, res.user);
      return res.user;
    } catch (err) {
      error.value = err?.message || "error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (payload) => {
    loading.value = true;
    error.value = "";

    try {
      const res = await registerApi(payload);
      parsistSession(res.token, res.user);
      return res.user;
    } catch (err) {
      error.value = err?.message || "error";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const hydrateUser = async () => {
    if (!user.value?.id) {
      return;
    }

    try {
      const latest = await fetchMeApi(user.value.id);
      user.value = latest;
      localStorage.setItem("authUser", JSON.stringify(latest));
    } catch (err) {
      clearSession();
    }
  };

  const logOut = async () => {
    clearSession();
  };

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    hydrateUser,
    logOut,
  };
});
