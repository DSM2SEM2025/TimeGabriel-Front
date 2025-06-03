<template>
  <div class="bg-white p-4 rounded shadow">
    <table v-if="products.length > 0" class="w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="p-2 border-b">Nome do Produto</th>
          <th class="p-2 border-b">Preço</th>
          <th class="p-2 border-b">Estoque</th>
          <th class="p-2 border-b">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="p-2">{{ product.nome }}</td>
          <td class="p-2">R$ {{ formatarPreco(product.preco) }}</td>
          <td class="p-2">{{ product.estoque ?? '-' }}</td>
          <td class="p-2">
            <button
              class="bg-primary text-white px-2 py-1 rounded"
              @click="$emit('add-to-cart', product)"
            >
              Adicionar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-center p-6 text-gray-500">
      <SearchIcon class="mx-auto h-12 w-12 text-gray-400 h-12 w-12" />
      <div class="mt-2">Procure produtos por nome para adicionar ao checkout.</div>
    </div>
  </div>
</template>

<script setup>
import { SearchIcon } from '@heroicons/vue/outline'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

function formatarPreco(valor) {
  const preco = typeof valor === 'number' ? valor : 0
  return preco.toFixed(2).replace('.', ',')
}
</script>
