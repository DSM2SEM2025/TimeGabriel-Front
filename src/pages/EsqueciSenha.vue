<template>
  <div class="flex items-center justify-center min-h-screen bg-purple-300">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="flex justify-center mb-6">
        <div class="flex items-center">
          <CubeIcon class="h-6 w-6 mr-2" />
          <h1 class="text-2xl font-bold">Mini Mercado Ideal</h1>
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-4 text-center">Recuperar Senha</h2>
      <p class="text-gray-600 mb-6 text-center">
        Digite seu email para receber instruções de recuperação de senha.
      </p>

      <form @submit.prevent="handleSubmit">
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-4"
          :icon="MailIcon"
        />

        <BaseButton
          type="submit"
          class="w-full bg-purple-400 hover:bg-purple-500"
          :loading="isLoading"
        >
          Enviar Instruções
        </BaseButton>

        <div class="text-center mt-4">
          <router-link
            to="/login"
            class="text-sm text-gray-600 hover:text-gray-800"
          >
            Voltar para o Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { CubeIcon, MailIcon } from "@heroicons/vue/outline";
import BaseInput from "@/components/ui/Login/BaseInput.vue";
import BaseButton from "@/components/ui/Login/BaseButton.vue";

const router = useRouter();
const email = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  if (!email.value) return;

  try {
    isLoading.value = true;
    // Simulando chamada da API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/verificar-codigo"); 
  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
