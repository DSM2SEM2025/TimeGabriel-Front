<template>
  <div class="bg-white p-4 rounded-xl shadow">
    <table v-if="products.length > 0" class="w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="p-3 border-b border-gray-200 text-gray-600 w-1/2">
            Nome do Produto
          </th>
          <th
            class="p-3 border-b border-gray-200 text-gray-600 text-center w-1/4"
          >
            Preço
          </th>
          <th
            class="p-3 border-b border-gray-200 text-gray-600 text-center w-1/4"
          >
            Estoque
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-50"
        >
          <td class="p-3">{{ product.nome }}</td>
          <td class="p-3 text-center">R$ {{ formatarPreco(product.preco) }}</td>
          <td class="p-3 text-center">{{ product.estoque ?? "-" }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-center p-6 text-gray-500">
      <SearchIcon class="mx-auto h-12 w-12 text-gray-400" />
      <div class="mt-2">
        Procure produtos por nome para adicionar ao checkout.
      </div>
    </div>
  </div>
</template>

<script setup>
import { SearchIcon } from "@heroicons/vue/outline";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

function formatarPreco(valor) {
  const preco = typeof valor === "number" ? valor : 0;
  return preco.toFixed(2).replace(".", ",");
}
</script>
