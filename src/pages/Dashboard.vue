<template>
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        title="Total de Produtos"
        :value="dashboardData.totalProdutos"
        :icon="CubeIcon"
        color="bg-blue-100"
        :change="dashboardData.totalProdutosChange"
        @click="navigateTo('/produtos')"
      />
      <SummaryCard
        title="Produtos em Baixo estoque"
        :value="dashboardData.produtosBaixoEstoque"
        :icon="ExclamationIcon"
        color="bg-yellow-100"
        :change="dashboardData.produtosBaixoEstoqueChange"
        @click="navigateTo('/estoque')"
      />
      <SummaryCard
        title="Entregas Pendentes"
        :value="dashboardData.entregasPendentes"
        :icon="TruckIcon"
        color="bg-orange-100"
        @click="navigateTo('/entregas')"
      />
      <SummaryCard
        title="Saída de Produtos"
        :value="dashboardData.saidaProdutos"
        :icon="ArrowUpIcon"
        color="bg-green-100"
        @click="navigateTo('/checkout')"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">Atividade recente</h2>
        <ul class="text-sm divide-y">
          <li v-for="(item, index) in dashboardData.atividadesRecentes" :key="index" class="py-2">
            {{ item.descricao }}
            <span class="text-gray-500">({{ item.tempo }})</span>
          </li>
        </ul>
        <button class="mt-4 text-sm text-blue-600 hover:underline">
          Ver todas as atividades
        </button>
      </div>

      <div class="bg-yellow-100 p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-2">Alerta de Estoque Baixo</h2>
        <p class="text-sm text-gray-600 mb-3">Itens que precisam de reposição</p>
        <ul class="text-sm">
          <li v-for="(item, index) in dashboardData.alertasEstoque" :key="index" class="flex justify-between border-b py-1">
            {{ item.nome }}
            <span class="text-red-600">
              {{ item.quantidade }} restando <span v-if="item.minimo" class="text-gray-500">(Mínimo: {{ item.minimo }})</span>
            </span>
          </li>
        </ul>
        <button class="mt-4 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-lg text-sm">
          Repor Estoque
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ActionCard
        title="Adicionar novo Produto"
        description="Registrar novo item no estoque"
        color="bg-purple-200"
        :icon="PlusIcon"
        @click="navigateTo('/produtos')"
      />
      <ActionCard
        title="Atualizar Estoque"
        description="Ajustar quantidades"
        color="bg-blue-200"
        :icon="PencilIcon"
        @click="navigateTo('/estoque')"
      />
      <ActionCard
        title="Confirmar Entregas"
        description="Verificar entregas pendentes"
        color="bg-green-200"
        :icon="TruckIcon"
        @click="navigateTo('/entregas')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  CubeIcon,
  ExclamationIcon,
  TruckIcon,
  ArrowUpIcon,
  PlusIcon,
  PencilIcon,
} from "@heroicons/vue/outline";
import { useRouter } from "vue-router";
import SummaryCard from "../components/ui/Dashboard/SummaryCard.vue";
import ActionCard from "../components/ui/Dashboard/ActionCard.vue";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

const dashboardData = ref({
  totalProdutos: 0,
  totalProdutosChange: "",
  produtosBaixoEstoque: 0,
  produtosBaixoEstoqueChange: "",
  entregasPendentes: 0,
  saidaProdutos: 0,
  atividadesRecentes: [],
  alertasEstoque: [],
});

function fetchDashboardData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalProdutos: 60,
        totalProdutosChange: "+3",
        produtosBaixoEstoque: 10,
        produtosBaixoEstoqueChange: "-3",
        entregasPendentes: 15,
        saidaProdutos: 12,
        atividadesRecentes: [
          { descricao: "Produto adicionado - Margarina - 10 unidades", tempo: "10 minutos atrás" },
          { descricao: "Estoque Atualizado - Biscoito Oreo - -15 unidades", tempo: "25 minutos atrás" },
          { descricao: "Entrega Confirmada - Coca-Cola pedido #447 - 32 itens", tempo: "1 hora atrás" },
          { descricao: "Alerta de Estoque Baixo - Ovos de Galinha Caipira - 2 unidades restantes", tempo: "1 dia atrás" },
        ],
        alertasEstoque: [
          { nome: "Abacate", quantidade: 1 },
          { nome: "Suco de peroba", quantidade: 2, minimo: 9 },
          { nome: "Bolacha", quantidade: 4, minimo: 7 },
        ],
      });
    }, 500); 
  });
}

onMounted(async () => {
  const data = await fetchDashboardData();
  dashboardData.value = data;
});
</script>

<style scoped></style>
