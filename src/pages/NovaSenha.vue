<template>
  <div class="flex items-center justify-center min-h-screen bg-purple-300">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="flex justify-center mb-6">
        <div class="flex items-center">
          <CubeIcon class="h-6 w-6 mr-2" />
          <h1 class="text-2xl font-bold">Mini Mercado Ideal</h1>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <BaseInput
            v-model="newPassword"
            type="password"
            placeholder="Nova Senha"
            :icon="LockClosedIcon"
            :showPasswordToggle="true"
            @blur="validatePasswords"
          />
        </div>

        <div>
          <BaseInput
            v-model="confirmPassword"
            type="password"
            placeholder="Confirme sua Senha"
            :icon="LockClosedIcon"
            :showPasswordToggle="true"
            @blur="validatePasswords"
          />

          <p v-if="passwordError" class="mt-2 text-sm text-red-600">
            {{ passwordError }}
          </p>
        </div>

        <BaseButton
          type="submit"
          class="w-full bg-purple-400 hover:bg-purple-500"
          :loading="isLoading"
        >
          Finalizar
        </BaseButton>
      </form>
    </div>

    <!-- Pop-up de sucesso -->
    <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="showSuccessMessage"
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center"
      >
        <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
        <span>Nova Senha Cadastrada com Sucesso!</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  CubeIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/vue/outline";
import BaseInput from "@/components/ui/Login/BaseInput.vue";
import BaseButton from "@/components/ui/Login/BaseButton.vue";

const router = useRouter();
const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const showSuccessMessage = ref(false);
const passwordError = ref("");

const validatePasswords = () => {
  if (newPassword.value && confirmPassword.value) {
    if (newPassword.value !== confirmPassword.value) {
      passwordError.value = "As senhas não coincidem";
    } else {
      passwordError.value = "";
    }
  }
};

watch([newPassword, confirmPassword], () => {
  if (newPassword.value && confirmPassword.value) {
    validatePasswords();
  }
});

const handleSubmit = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    passwordError.value = "Preencha todos os campos";
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = "As senhas não coincidem";
    return;
  }

  try {
    isLoading.value = true;
    passwordError.value = ""; 

    // Simulando chamada da API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    showSuccessMessage.value = true;

    // Aguarda 2 segundos e redireciona para o login
    setTimeout(async () => {
      await router.push("/login");
    }, 2000);
  } catch (err) {
    passwordError.value = "Erro ao cadastrar nova senha";
    console.error("Erro:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
