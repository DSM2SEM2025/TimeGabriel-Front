<template>
  <div class="p-6">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-3/4 space-y-6">
        <ProductSearch @add-to-cart="addToCart" />
        <ProductTable :products="filteredProducts" />
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