<template>
  <div class="mb-4 bg-white p-4 rounded shadow">
    <h2 class="text-lg font-semibold mb-2 flex items-center gap-2">
      <SearchIcon class="w-5 h-5 text-gray-600" />
      Procurar Produto
    </h2>
    <input
      :value="modelValue"
      @input="onInput"
      type="text"
      @keyup.enter="adicionarProduto"
      placeholder="Procurar Produtos por Nome"
      class="w-full p-2 border rounded mb-2"
    />
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded w-full"
      @click="adicionarProduto"
    >
      Adicionar Produto
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { SearchIcon } from '@heroicons/vue/outline'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'add-to-cart'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function adicionarProduto() {
  if (!props.modelValue) return

  const produtoMock = {
    id: Date.now(),
    nome: props.modelValue,
    preco: Math.floor(Math.random() * 100) + 1,
    estoque: Math.floor(Math.random() * 50) + 1
  }

  emit('add-to-cart', produtoMock)
  emit('update:modelValue', '') 
}
</script>
