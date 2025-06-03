<template>
  <div class="p-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Registro Manual -->
      <div class="bg-white rounded-xl shadow p-6">
        <h2 class="text-lg font-semibold mb-6">Registro Manual de Produtos</h2>
        
        <form @submit.prevent="handleManualRegister" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto
              </label>
              <input
                v-model="manualForm.name"
                type="text"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                v-model="manualForm.category"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              >
                <option value="">Selecione uma categoria</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              v-model="manualForm.description"
              rows="4"
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Inicial
              </label>
              <input
                v-model="manualForm.initialQuantity"
                type="number"
                min="0"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Preço
              </label>
              <input
                v-model="manualForm.price"
                type="number"
                min="0"
                step="0.01"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Mínima
              </label>
              <input
                v-model="manualForm.minQuantity"
                type="number"
                min="0"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Validade
              </label>
              <input
                v-model="manualForm.expiryDate"
                type="date"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Código de Barras (opcional)
              </label>
              <input
                v-model="manualForm.barcode"
                type="text"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Fornecedor
            </label>
            <input
              v-model="manualForm.supplier"
              type="text"
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
              required
            />
          </div>

          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="resetForm"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              Registrar Produto
            </button>
          </div>
        </form>
      </div>

      <!-- Registro Automatizado -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow p-6">
          <h2 class="text-lg font-semibold mb-6">Registro Automatizado de Produto</h2>
          
          <form @submit.prevent="handleAutomatedRegister" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Link da Nota Fiscal
              </label>
              <input
                v-model="automatedForm.invoiceLink"
                type="text"
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
                required
              />
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
              >
                Registrar Produto
              </button>
            </div>
          </form>
        </div>

        <div class="bg-blue-50 rounded-xl p-6">
          <h3 class="font-semibold mb-4">Como funciona:</h3>
          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                1
              </div>
              <p>Coloque o Link da Nota Fiscal e clique em Registrar Produto</p>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                2
              </div>
              <p>O sistema automaticamente extrai os produtos do Link da Nota Fiscal</p>
            </li>
            <li class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                3
              </div>
              <p>Os produtos ficam marcados como "Entrega Pendente" até a confirmação da entrega</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ["Alimentos", "Bebidas", "Laticínios"];

const manualForm = ref({
  name: '',
  category: '',
  description: '',
  initialQuantity: 0,
  price: 0,
  minQuantity: 1,
  expiryDate: '',
  barcode: '',
  supplier: ''
});

const automatedForm = ref({
  invoiceLink: ''
});

const handleManualRegister = () => {
  // Implementar lógica de registro manual
    //Aqui entra o backend
  console.log('Produto registrado:', manualForm.value);
};

const handleAutomatedRegister = () => {
  // Implementar lógica de registro automatizado
  //Aqui entra o backend
  console.log('Link da nota fiscal:', automatedForm.value.invoiceLink);
};

const resetForm = () => {
  if (confirm('Deseja cancelar o registro?')) {
    manualForm.value = {
      name: '',
      category: '',
      description: '',
      initialQuantity: 0,
      price: 0,
      minQuantity: 1,
      expiryDate: '',
      barcode: '',
      supplier: ''
    };
  }
};
</script>