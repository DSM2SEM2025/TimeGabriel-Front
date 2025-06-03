<template>
  <div class="flex items-center justify-center min-h-screen bg-purple-300">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="flex justify-center mb-6">
        <div class="flex items-center">
          <CubeIcon class="h-6 w-6 mr-2" />
          <h1 class="text-2xl font-bold">Mini Mercado Ideal</h1>
        </div>
      </div>

      <h2 class="text-lg text-center mb-6">
        Insira o Código de Confirmação enviado ao seu Email
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex justify-between space-x-2">
          <input
            v-for="(digit, index) in 5"
            :key="index"
            v-model="verificationCode[index]"
            type="text"
            maxlength="1"
            class="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            :ref="(el) => (inputs[index] = el)"
            @input="handleInput(index)"
            @keydown.delete="handleDelete(index)"
            @keydown.left="moveFocus(index - 1)"
            @keydown.right="moveFocus(index + 1)"
          />
        </div>

        <BaseButton
          type="submit"
          class="w-full bg-purple-400 hover:bg-purple-500"
          :loading="isLoading"
        >
          Enviar
        </BaseButton>

        <div class="text-center">
          <button
            type="button"
            @click="handleResendCode"
            class="text-sm text-gray-600 hover:text-gray-800"
            :disabled="resendCountdown > 0"
          >
            {{ resendText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { CubeIcon } from "@heroicons/vue/outline";
import BaseButton from "@/components/ui/Login/BaseButton.vue";

const router = useRouter();
const verificationCode = ref(["", "", "", "", ""]);
const inputs = ref([]);
const isLoading = ref(false);
const resendCountdown = ref(0);

const resendText = computed(() => {
  if (resendCountdown.value > 0) {
    return `Reenviar código (${resendCountdown.value}s)`;
  }
  return "Reenviar código";
});

const handleInput = (index) => {
  if (verificationCode.value[index].length === 1) {
    if (index < 4) {
      moveFocus(index + 1);
    }
  }
};

const handleDelete = (index) => {
  if (!verificationCode.value[index] && index > 0) {
    moveFocus(index - 1);
  }
};

const moveFocus = (index) => {
  if (index >= 0 && index < 5) {
    inputs.value[index]?.focus();
  }
};

const startResendCountdown = () => {
  resendCountdown.value = 30;
  const timer = setInterval(() => {
    resendCountdown.value--;
    if (resendCountdown.value === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const handleResendCode = async () => {
  try {
    // Simula a chamada de API para reenviar o código
    await new Promise((resolve) => setTimeout(resolve, 1000));
    startResendCountdown();
  } catch (error) {
    console.error("Erro ao reenviar código:", error);
  }
};

const handleSubmit = async () => {
  const code = verificationCode.value.join("");
  if (code.length !== 5) return;

  try {
    isLoading.value = true;
    // Simula a chamada da API para verificar o código
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/nova-senha");
  } catch (error) {
    console.error("Erro ao verificar código:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
