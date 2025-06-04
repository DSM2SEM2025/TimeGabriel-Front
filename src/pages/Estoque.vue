<template>
  <div class="p-4 sm:p-6">
    <!-- Cards estatísticos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <!-- Total de Produtos -->
      <div
        class="bg-blue-100 p-4 rounded-2xl flex items-center justify-between"
      >
        <div>
          <h3 class="text-sm text-gray-600">Total de Produtos</h3>
          <p class="text-2xl font-bold">{{ stockStats.totalProducts }}</p>
        </div>
        <CubeIcon class="h-8 w-8 text-blue-500" />
      </div>

      <!-- Produtos com Baixo Estoque -->
      <div
        class="bg-yellow-100 p-4 rounded-2xl flex items-center justify-between"
      >
        <div>
          <h3 class="text-sm text-gray-600">Produtos com Baixo Estoque</h3>
          <p class="text-2xl font-bold">{{ stockStats.lowStockCount }}</p>
        </div>
        <BellIcon class="h-8 w-8 text-yellow-500" />
      </div>

      <!-- Atualizações de Estoque -->
      <div
        class="bg-green-100 p-4 rounded-2xl flex items-center justify-between"
      >
        <div>
          <h3 class="text-sm text-gray-600">Atualizações de Estoque</h3>
          <p class="text-2xl font-bold">{{ stockStats.updateCount }}</p>
        </div>
        <RefreshIcon class="h-8 w-8 text-green-500" />
      </div>
    </div>

    <TabGroup>
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <TabList class="flex space-x-1 rounded-xl bg-purple-100 p-1 mb-6 min-w-max">
            <Tab v-slot="{ selected }">
              <button
                class="rounded-lg py-2.5 text-sm font-medium leading-5 px-4 sm:px-6 whitespace-nowrap"
                :class="[
                  'focus:outline-none',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-700'
                ]"
              >
                Estoque Atual
              </button>
            </Tab>
            <Tab v-slot="{ selected }">
              <button
                class="rounded-lg py-2.5 text-sm font-medium leading-5 px-4 sm:px-6 whitespace-nowrap"
                :class="[
                  'focus:outline-none',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-700'
                ]"
              >
                Histórico de Atualizações
              </button>
            </Tab>
          </TabList>
        </div>

        <TabPanels class="flex-1">
          <TabPanel>
            <div class="space-y-4 sm:space-y-6">
              <div class="flex flex-col sm:flex-row gap-4">
                <div class="w-full sm:w-1/2 flex items-center bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-purple-300">
                  <SearchIcon class="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Procurar Produtos..."
                    class="w-full py-2 px-3 focus:outline-none rounded-lg"
                  />
                </div>

                <div class="flex flex-wrap gap-2 sm:gap-4">
                  <select
                    v-model="selectedCategory"
                    class="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    <option value="">Categorias</option>
                    <option
                      v-for="category in categories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>

                  <select
                    v-model="selectedStatus"
                    class="flex-1 sm:flex-none px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
                  >
                    <option value="">Status</option>
                    <option
                      v-for="status in statusOptions"
                      :key="status"
                      :value="status"
                    >
                      {{ status }}
                    </option>
                  </select>

                  <button
                    @click="clearFilters"
                    class="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>

              <!-- Tabela -->
              <div class="bg-white rounded-xl shadow overflow-hidden">
                <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 class="text-lg font-semibold">Inventário</h2>
                  <button
                    @click="navigateToProdutos"
                    class="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <PlusIcon class="h-5 w-5 mr-2" />
                    Adicionar Produto
                  </button>
                </div>

                <!-- Tabela Responsiva -->
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600">
                          Produto/Fornecedor
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Categoria
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Quantidade
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Quantidade Mínima
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Status
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Validade
                        </th>
                        <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
                        <td class="px-4 py-3">
                          <div class="max-w-xs sm:max-w-none">
                            <p class="font-medium truncate">{{ item.name }}</p>
                            <p class="text-xs sm:text-sm text-gray-500 truncate">{{ item.supplier }}</p>
                          </div>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ item.category }}</td>
                        <td class="px-4 py-3 text-sm">{{ item.quantity }}</td>
                        <td class="px-4 py-3 text-sm">{{ item.minQuantity }}</td>
                        <td class="px-4 py-3">
                          <span
                            class="px-2 py-1 text-xs rounded-full"
                            :class="{
                              'bg-green-100 text-green-700':
                                item.status === 'Em Estoque' &&
                                !checkExpiryStatus(item.expiryDate),
                              'bg-red-100 text-red-700': item.status === 'Baixo Estoque',
                              'bg-orange-100 text-orange-700': checkExpiryStatus(
                                item.expiryDate
                              ),
                            }"
                          >
                            {{ item.status }}
                            <span v-if="checkExpiryStatus(item.expiryDate)" class="ml-1">
                              (Expirando)
                            </span>
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm">{{ item.expiryDate }}</td>
                        <td class="px-4 py-3 relative">
                          <button
                            class="text-gray-400 hover:text-gray-600"
                            @click="openActionsMenu(item, $event)"
                          >
                            <DotsVerticalIcon class="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Paginação -->
                <div class="p-4 border-t border-gray-200">
                  <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div class="flex items-center gap-2 text-sm">
                      <span class="text-gray-600">Itens por página:</span>
                      <select
                        v-model="itemsPerPage"
                        @change="handleItemsPerPageChange($event.target.value)"
                        class="border rounded-md px-2 py-1"
                      >
                        <option
                          v-for="option in itemsPerPageOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>

                    <div class="text-sm text-gray-600 text-center">
                      Página {{ currentPage }} de {{ totalPages }}
                      <span class="hidden sm:inline">({{ paginatedItems.length }} itens)</span>
                    </div>

                    <div class="flex flex-wrap justify-center gap-2">
                      <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="handlePageChange(page)"
                        class="px-3 py-1 rounded-md text-sm min-w-[2.5rem]"
                        :class="[
                          currentPage === page
                            ? 'bg-purple-500 text-white'
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                        ]"
                      >
                        {{ page }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <!-- Historico de atualizações -->
          <TabPanel>
            <div class="bg-white rounded-xl shadow overflow-hidden">
              <div class="divide-y divide-gray-200">
                <div v-for="update in recentUpdates" :key="update.id" class="p-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                    <div class="font-medium">{{ update.productName }}</div>
                    <div :class="update.quantity.startsWith('-') ? 'text-red-600' : 'text-green-600'">
                      {{ update.quantity }}
                    </div>
                    <div class="text-sm text-gray-500">{{ update.date }}</div>
                    <div class="text-right text-sm text-gray-500">{{ update.updatedBy }}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>

    <div
      v-if="showActionsMenu"
      class="actions-menu fixed z-50 bg-white rounded-lg shadow-lg py-1 w-48"
      :style="{
        top: `${actionMenuPosition.y}px`,
        left: `${actionMenuPosition.x}px`,
        transform: 'translateX(-90%)',
      }"
    >
      <button
        @click="handleModify(selectedItem)"
        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <PencilIcon class="h-4 w-4 mr-2" />
        Modificar
      </button>
      <button
        @click="handleDelete(selectedItem)"
        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
      >
        <TrashIcon class="h-4 w-4 mr-2" />
        Deletar
      </button>
    </div>

    <ModifyProductModal
      :show="showModifyModal"
      :product="selectedItem"
      @close="showModifyModal = false"
      @save="handleSaveModification"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import {
  CubeIcon,
  BellIcon,
  RefreshIcon,
  SearchIcon,
  DotsVerticalIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/vue/outline";
import { useRouter } from 'vue-router';
import ModifyProductModal from "../components/ui/Estoque/ModifyProductModal.vue";
import { useEstoque } from '@/composables/useEstoque'

const router = useRouter();

const navigateToProdutos = () => {
  router.push('/produtos');
};

// Depois mudar para chamar no backend
const inventory = ref([
  {
    id: 1,
    name: "Arroz Integral",
    supplier: "Camil",
    category: "Alimentos",
    quantity: 25,
    minQuantity: 10,
    status: "Em Estoque",
    expiryDate: "27/12/2025",
  },
  {
    id: 2,
    name: "Biscoito Cream Cracker",
    supplier: "Vitarella",
    category: "Alimentos",
    quantity: 3,
    minQuantity: 10,
    status: "Baixo Estoque",
    expiryDate: "27/04/2025",
  },
  {
    id: 3,
    name: "Leite Integral",
    supplier: "Betânia",
    category: "Laticínios",
    quantity: 15,
    minQuantity: 5,
    status: "Em Estoque",
    expiryDate: "05/06/2025", 
  },
]);

const categories = ["Alimentos", "Bebidas", "Laticínios"];
const searchQuery = ref("");
const selectedCategory = ref("");
const statusOptions = [
  "Em Estoque",
  "Baixo Estoque",
  "Em Estoque (Expirando)",
  "Baixo Estoque (Expirando)"
];
const selectedStatus = ref("");
//Depois mudar para chamar no backend
const recentUpdates = ref([
  {
    id: 1,
    productName: "Arroz Integral",
    quantity: "+25",
    date: "27/04/2025 10:30",
    updatedBy: "Admin",
  },
  {
    id: 2,
    productName: "Biscoito Cream Cracker",
    quantity: "-7",
    date: "27/04/2025 09:45",
    updatedBy: "Admin",
  },
  {
    id: 3,
    productName: "Leite Integral",
    quantity: "+15",
    date: "26/04/2025 14:20",
    updatedBy: "Admin",
  },
]);

const { stockStats, fetchStockStats, initializeRealTimeUpdates } = useEstoque()

// Fetch inicial dos dados
onMounted(async () => {
  await fetchStockStats()
  
  // Inicializa WebSocket para atualizações em tempo real
  const ws = initializeRealTimeUpdates()
  
  onUnmounted(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close()
    }
  })
})

const filteredItems = computed(() => {
  let items = inventory.value;

  // filtro de pesquisa
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query)
    );
  }

  // Categorias filtro
  if (selectedCategory.value) {
    items = items.filter((item) => item.category === selectedCategory.value);
  }

  // Status filtro
  if (selectedStatus.value) {
    items = items.filter((item) => {
      const isExpiring = checkExpiryStatus(item.expiryDate);
      const itemStatus = `${item.status}${isExpiring ? " (Expirando)" : ""}`;
      return itemStatus === selectedStatus.value;
    });
  }

  return items;
});

const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [10, 20, 50];

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filteredItems.value.slice(startIndex, startIndex + itemsPerPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value);
});

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedStatus.value = "";
};

const selectedItem = ref(null);
const showActionsMenu = ref(false);
const actionMenuPosition = ref({ x: 0, y: 0 });
const showModifyModal = ref(false);

const openActionsMenu = (item, event) => {
  event.preventDefault();
  event.stopPropagation();

  selectedItem.value = item;
  showActionsMenu.value = true;

  const rect = event.target.getBoundingClientRect();
  actionMenuPosition.value = {
    x: rect.x,
    y: rect.y + rect.height,
  };

  const closeMenu = (e) => {
    if (!e.target.closest(".actions-menu")) {
      showActionsMenu.value = false;
      document.removeEventListener("click", closeMenu);
    }
  };

  document.addEventListener("click", closeMenu);
};

const handleModify = (item) => {
  selectedItem.value = item;
  showModifyModal.value = true;
  showActionsMenu.value = false;
};

const handleSaveModification = (updatedProduct) => {
  inventory.value = inventory.value.map(item => 
    item.id === updatedProduct.id ? updatedProduct : item
  );

  recentUpdates.value.unshift({
    id: Date.now(),
    productName: updatedProduct.name,
    quantity: `${updatedProduct.quantity}`,
    date: new Date().toLocaleDateString('pt-BR'),
    updatedBy: "Admin"
  });

  showModifyModal.value = false;
};

const handleDelete = (item) => {
  if (confirm(`Tem certeza que deseja deletar ${item.name}?`)) {
    inventory.value = inventory.value.filter(p => p.id !== item.id);

    recentUpdates.value.unshift({
      id: Date.now(),
      productName: item.name,
      quantity: "Removido",
      date: new Date().toLocaleDateString('pt-BR'),
      updatedBy: "Admin"
    });
  }
  showActionsMenu.value = false;
};

const checkExpiryStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate.split("/").reverse().join("-"));
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleItemsPerPageChange = (value) => {
  itemsPerPage.value = Number(value);
  currentPage.value = 1; 
};

watch([searchQuery, selectedCategory, selectedStatus], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.actions-menu {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}
</style>
<style scoped>
.actions-menu {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15));
}
</style>