<template>
  <div class="w-1/4 bg-purple-300 text-white p-4 rounded shadow flex flex-col">
    <h2 class="text-lg font-semibold mb-2">
      Resumo Checkout
      <div class="text-sm font-normal text-white/70">
        {{ cart.length }} {{ cart.length === 1 ? 'item' : 'itens' }} no carrinho
      </div>
    </h2>

    <div v-for="(item, index) in cart" :key="item.id" class="mb-2 bg-white text-black rounded p-2">
      <div class="flex justify-between items-center">
        <div>
          <div class="font-semibold">{{ item.nome }}</div>
          <div class="text-sm text-gray-500">
            {{ formatarPreco(item.preco) }} cada
          </div>
        </div>
        <div class="text-right">
          <div class="flex items-center gap-1">
            <button class="px-2" @click="decrementar(index)">−</button>
            <span>{{ item.quantidade || 1 }}</span>
            <button class="px-2" @click="incrementar(index)">+</button>
          </div>
          <div class="font-semibold">R$ {{ formatarPreco(item.preco * (item.quantidade || 1)) }}</div>
        </div>
      </div>
      <button
        @click="$emit('remove', index)"
        class="text-sm text-red-500 hover:text-red-700 mt-1"
      >
        Remover
      </button>
    </div>

    <hr class="my-2 border-white/40" />

    <div class="flex justify-between font-semibold mb-4">
  <span>Total:</span>
  <span>R$ {{ formatarPreco(total) }}</span>
</div>


    <button
      class="bg-white text-purple-700 font-bold py-2 rounded mb-2"
      @click="$emit('finalize')"
    >
      Finalizar Checkout
    </button>

    <button
      class="bg-white text-purple-700 py-2 rounded mb-2"
      @click="$emit('clear')"
    >
      Limpar Carrinho
    </button>

    <button class="bg-white text-purple-700 py-2 rounded">
      Imprimir
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['remove', 'finalize', 'clear', 'update-quantity'])

const total = computed(() =>
  props.cart.reduce((sum, item) => {
    const preco = Number(item.preco)
    const quantidade = Number(item.quantidade) || 1
    return sum + (isNaN(preco) ? 0 : preco * quantidade)
  }, 0)
)

function formatarPreco(valor) {
  const preco = Number(valor)
  return isNaN(preco) ? '0,00' : preco.toFixed(2).replace('.', ',')
}

function incrementar(index) {
  const item = props.cart[index]
  const novaQuantidade = (item.quantidade || 1) + 1
  emit('update-quantity', { index, quantidade: novaQuantidade })
}

function decrementar(index) {
  const item = props.cart[index]
  const quantidadeAtual = item.quantidade || 1
  if (quantidadeAtual > 1) {
    emit('update-quantity', { index, quantidade: quantidadeAtual - 1 })
  }
}
</script>
