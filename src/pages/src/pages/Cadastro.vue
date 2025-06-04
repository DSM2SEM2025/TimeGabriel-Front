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
            v-model="email"
            type="email"
            placeholder="Email"
            :icon="MailIcon"
            @blur="validateEmail"
          />
          <p v-if="emailError" class="mt-1 text-sm text-red-600">
            {{ emailError }}
          </p>
        </div>

        <div>
          <BaseInput
            v-model="password"
            type="password"
            placeholder="Senha"
            :icon="LockClosedIcon"
            :showPasswordToggle="true"
            @blur="validatePassword"
          />
          <p v-if="passwordError" class="mt-1 text-sm text-red-600">
            {{ passwordError }}
          </p>
        </div>

        <BaseButton
          type="submit"
          class="w-full bg-purple-400 hover:bg-purple-500"
          :loading="isLoading"
        >
          Cadastrar
        </BaseButton>

        <div class="text-center">
          <router-link
            to="/login"
            class="text-sm text-gray-600 hover:text-gray-800"
          >
            Voltar para Login
          </router-link>
        </div>
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
        <span>Cadastro realizado com sucesso!</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { CubeIcon, MailIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/vue/outline";
import BaseInput from "@/components/ui/Login/BaseInput.vue";
import BaseButton from "@/components/ui/Login/BaseButton.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const emailError = ref("");
const passwordError = ref("");
const showSuccessMessage = ref(false);

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = "Email é obrigatório";
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Email inválido";
  } else {
    emailError.value = "";
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = "Senha é obrigatória";
  } else if (password.value.length < 6) {
    passwordError.value = "A senha deve ter no mínimo 6 caracteres";
  } else {
    passwordError.value = "";
  }
};

const handleSubmit = async () => {
  validateEmail();
  validatePassword();

  if (emailError.value || passwordError.value) return;

  try {
    isLoading.value = true;
    // Aqui você implementaria a chamada para o backend
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação de chamada API

    showSuccessMessage.value = true;
    
    // Redireciona para login após 2 segundos
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>