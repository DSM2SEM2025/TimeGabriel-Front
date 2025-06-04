<template>
  <div class="p-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-3/4 space-y-6">

        <div class="mb-4">
          <label for="categoria" class="block mb-1 font-semibold">Filtrar por categoria:</label>
          <select id="categoria" v-model="selectedCategory" class="border rounded p-2 w-full max-w-xs">
            <option value="">Todas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Laticínios">Laticínios</option>
          </select>
        </div>

        <ProductSearch v-model="searchTerm" @add-to-cart="addToCart" />

        <ProductTable
          :products="filteredProducts"
          @add-to-cart="addToCart"
        />

        <div v-if="checkoutHistory.length" class="mt-6">
          <h2 class="text-xl font-semibold mb-2">Histórico de Produtos Retirados</h2>
          <div
            v-for="(entry, index) in checkoutHistory"
            :key="index"
            class="p-4 border rounded shadow-sm bg-white space-y-2"
          >
            <p class="text-sm text-gray-500">Retirado em: {{ formatDate(entry.timestamp) }}</p>
            <ul class="space-y-1">
              <li
                v-for="(item, i) in entry.produtos"
                :key="i"
                class="border-b pb-1"
              >
                <p class="font-medium">{{ item.nome }}</p>
                <p>Quantidade: {{ item.quantidade }}</p>
                <p>Preço unitário: R$ {{ item.preco.toFixed(2) }}</p>
                <p>Total: R$ {{ (item.preco * item.quantidade).toFixed(2) }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/4">
        <div class="sticky top-6">
          <CheckoutSummary
            :cart="cart"
            @remove="removeFromCart"
            @finalize="finalizeCheckout"
            @clear="clearCart"
            @update-quantity="updateQuantity"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductSearch from '@/components/ui/Checkout/ProductSearch.vue'
import ProductTable from '@/components/ui/Checkout/ProductTable.vue'
import CheckoutSummary from '@/components/ui/Checkout/CheckoutSummary.vue'

const cart = ref([])
const checkoutHistory = ref([])
const selectedCategory = ref('')
const searchTerm = ref('')
const products = ref([])
// Faz o L, as coisas estão tudo cara
function generateRandomProducts(count = 20) {
  const categorias = ['Alimentos', 'Bebidas', 'Laticínios']
  const nomes = {
    Alimentos: ['Arroz', 'Feijão', 'Macarrão', 'Farinha', 'Açúcar'],
    Bebidas: ['Refrigerante', 'Suco', 'Água Mineral', 'Cerveja', 'Vinho'],
    Laticínios: ['Leite', 'Queijo', 'Iogurte', 'Manteiga', 'Creme de Leite']
  }

  const produtosGerados = []

  for (let i = 1; i <= count; i++) {
    const categoria = categorias[Math.floor(Math.random() * categorias.length)]
    const nomeList = nomes[categoria]
    const nome = nomeList[Math.floor(Math.random() * nomeList.length)]
    const preco = (Math.random() * 20 + 1).toFixed(2)
    const estoque = Math.floor(Math.random() * 30) + 1

    produtosGerados.push({
      id: i,
      nome,
      categoria,
      preco: parseFloat(preco),
      estoque
    })
  }
  return produtosGerados
}

onMounted(() => {
  products.value = generateRandomProducts(30)
})

const filteredProducts = computed(() => {
  return products.value.filter(produto => {
    const matchCategory = selectedCategory.value ? produto.categoria === selectedCategory.value : true
    const matchSearch = searchTerm.value
      ? produto.nome.toLowerCase().includes(searchTerm.value.toLowerCase())
      : true 
    return matchCategory && matchSearch
  })
})

function addToCart(product) {
  const index = cart.value.findIndex(item => item.id === product.id)

  if (index !== -1) {
    const currentQty = cart.value[index].quantidade
    if (currentQty < product.estoque) {
      cart.value[index].quantidade += 1
    } else {
      alert(`Estoque máximo atingido para o produto "${product.nome}"`)
    }
  } else {
    if (product.estoque > 0) {
      cart.value.push({ ...product, quantidade: 1 })
    } else {
      alert(`Produto "${product.nome}" está sem estoque`)
    }
  }
}

function removeFromCart(index) {
  cart.value.splice(index, 1)
}

function updateQuantity({ index, quantidade }) {
  const produto = cart.value[index]
  if (quantidade <= produto.estoque) {
    cart.value[index].quantidade = quantidade
  } else {
    alert(`Estoque máximo para "${produto.nome}" é ${produto.estoque}`)
  }
}

function clearCart() {
  cart.value = []
}

function finalizeCheckout() {
  const now = new Date()
  checkoutHistory.value.push({
    timestamp: now,
    produtos: cart.value.map(item => ({ ...item }))
  })
  alert('Checkout finalizado!')
  clearCart()
}

function formatDate(date) {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>
