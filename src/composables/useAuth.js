import { ref } from "vue";

const user = ref(null);
const isAuthenticated = ref(false);
const isLoading = ref(false);
const error = ref(null);

const loadStoredAuth = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    isAuthenticated.value = true;
  }
};

loadStoredAuth();

export function useAuth() {
  const login = async (email, password) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Simulando validação de credenciais
      if (email && password) {
        // Simulando delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Armazena dados do usuário
        const userData = { email, id: Date.now() };
        localStorage.setItem("user", JSON.stringify(userData));

        user.value = userData;
        isAuthenticated.value = true;
        return true;
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (e) {
      error.value = e.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}