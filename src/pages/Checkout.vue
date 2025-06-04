<template>
  <div class="p-4 sm:p-6">
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
      <div class="w-full lg:w-3/4 space-y-4 sm:space-y-6">
        <div class="bg-white rounded-lg shadow p-4">
          <ProductSearch 
            @add-to-cart="addToCart" 
            class="w-full"
          />
        </div>

        <div class="bg-white rounded-lg shadow overflow-hidden">
          <ProductTable 
            :products="filteredProducts"
            class="w-full"
          />
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
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductSearch from '@/components/ui/Checkout/ProductSearch.vue'
import ProductTable from '@/components/ui/Checkout/ProductTable.vue'
import CheckoutSummary from '@/components/ui/Checkout/CheckoutSummary.vue'

const cart = ref([])

const filteredProducts = computed(() => cart.value)

function addToCart(product) {
  const index = cart.value.findIndex(item => item.id === product.id)
  if (index !== -1) {
    cart.value[index].quantidade = (cart.value[index].quantidade || 1) + 1
  } else {
    cart.value.push({ ...product, quantidade: 1 })
  }
}

function removeFromCart(index) {
  cart.value.splice(index, 1)
}

function updateQuantity({ index, quantidade }) {
  cart.value[index].quantidade = quantidade
}

function clearCart() {
  cart.value = []
}

function finalizeCheckout() {
  alert('Checkout finalizado!')
  clearCart()
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .sticky {
    position: relative;
    top: 0;
  }
}
</style>