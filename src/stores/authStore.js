import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({
    id: null,
    name: "",
    email: "",
    avatar: null,
    role: "",
    department: "",
  });

  const token = ref(null);
  const isAuthenticated = computed(() => !!token.value);

  function setUser(userData) {
    user.value = { ...user.value, ...userData };
  }

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem("auth_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  function logout() {
    user.value = {
      id: null,
      name: "",
      email: "",
      avatar: null,
      role: "",
      department: "",
    };
    token.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    delete axios.defaults.headers.common["Authorization"];
  }

  async function fetchUser() {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get("/api/user");
      setUser(response.data);
      localStorage.setItem("user_data", JSON.stringify(response.data));
      return true;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return false;
    }
  }

  function restoreSession() {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user_data");

    if (savedToken) {
      token.value = savedToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }

    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user data");
      }
    }

    return !!savedToken;
  }

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    fetchUser,
    restoreSession,
  };
});

/**
 * Initialize auth store - called during app bootstrap
 */
export async function initializeAuthStore() {
  const { useAuthStore } = await import("./authStore");
  const store = useAuthStore();
  const restored = store.restoreSession();

  if (restored) {
    // Optionally verify token with server
    // await store.fetchUser();

    // For demo: set dummy user if no user data
    if (!store.user.name) {
      store.setUser({
        id: 1,
        name: "Demo User",
        email: "demo@mge.co.id",
        role: "user",
        department: "IT",
      });
    }
  }

  return restored;
}
