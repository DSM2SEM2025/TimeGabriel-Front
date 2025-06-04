<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="$emit('close')">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
              Modificar Produto
            </h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  v-model="form.name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Fornecedor
                </label>
                <input
                  type="text"
                  v-model="form.supplier"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <input
                  type="text"
                  v-model="form.category"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    v-model="form.quantity"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Quantidade Mínima
                  </label>
                  <input
                    type="number"
                    v-model="form.minQuantity"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Data de Validade
                </label>
                <input
                  type="date"
                  v-model="form.expiryDate"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Salvar
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: Boolean,
  product: Object,
});

const emit = defineEmits(["close", "save"]);

const form = ref({
  name: "",
  supplier: "",
  category: "",
  quantity: 0,
  minQuantity: 0,
  expiryDate: "",
});

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      form.value = {
        ...newProduct,
        expiryDate: newProduct.expiryDate.split("/").reverse().join("-"),
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const formattedDate = form.value.expiryDate.split("-").reverse().join("/");
  emit("save", {
    ...form.value,
    expiryDate: formattedDate,
  });
};
</script>