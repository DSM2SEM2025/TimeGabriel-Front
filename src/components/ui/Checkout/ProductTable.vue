<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2 text-left">Nome</th>
        <th class="border px-4 py-2 text-left">Categoria</th>
        <th class="border px-4 py-2 text-right">Preço (R$)</th>
        <th class="border px-4 py-2 text-right">Estoque</th>
        <th class="border px-4 py-2 text-center">Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        class="hover:bg-gray-50"
      >
        <td class="border px-4 py-2">{{ product.nome }}</td>
        <td class="border px-4 py-2">{{ product.categoria }}</td>
        <td class="border px-4 py-2 text-right">{{ product.preco.toFixed(2) }}</td>
        <td class="border px-4 py-2 text-right">{{ product.estoque }}</td>
        <td class="border px-4 py-2 text-center">
          <button
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            @click="$emit('add-to-cart', product)"
            :disabled="product.estoque === 0"
            title="Adicionar ao carrinho"
          >
            Adicionar
          </button>
        </td>
      </tr>
      <tr v-if="products.length === 0">
        <td colspan="5" class="text-center py-4 text-gray-500">
          Nenhum produto encontrado.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>
