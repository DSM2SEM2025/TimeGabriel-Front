<template>
  <div class="flex items-center justify-center min-h-screen bg-purple-300">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="flex justify-center mb-6">
        <div class="flex items-center">
          <CubeIcon class="h-6 w-6 mr-2" />
          <h1 class="text-2xl font-bold">Mini Mercado Ideal</h1>
        </div>
      </div>

      <form @submit.prevent="handleLogin">
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-4"
          :icon="MailIcon"
        />

        <BaseInput
          v-model="password"
          type="password"
          placeholder="Senha"
          class="mb-2"
          :icon="LockClosedIcon"
          :showPasswordToggle="true"
        />

        <div class="text-center mb-4">
          <router-link
            to="/esqueci-senha"
            class="text-sm text-gray-600 hover:text-gray-800"
          >
            Esqueceu a Senha?
          </router-link>
        </div>

        <BaseButton
          type="submit"
          class="w-full bg-purple-400 hover:bg-purple-500"
          :loading="isLoading"
        >
          Entrar
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { CubeIcon, MailIcon, LockClosedIcon } from "@heroicons/vue/outline";
import BaseInput from "@/components/ui/Login/BaseInput.vue";
import BaseButton from "@/components/ui/Login/BaseButton.vue";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const { login } = useAuth();

const handleLogin = async () => {
  if (!email.value || !password.value) return;

  try {
    isLoading.value = true;
    await login(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
