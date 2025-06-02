<template>
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard title="Total de Produtos" value="60" :icon="CubeIcon" color="bg-blue-100" change="+3" />
      <SummaryCard title="Produtos em Baixo estoque" value="10" :icon="ExclamationIcon" color="bg-yellow-100" change="-3" />
      <SummaryCard title="Entregas Pendentes" value="15" :icon="TruckIcon" color="bg-orange-100" />
      <SummaryCard title="Saída de Produtos" value="12" :icon="ArrowUpIcon" color="bg-green-100" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="lg:col-span-2 bg-white p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-4">Atividade recente</h2>
        <ul class="text-sm divide-y">
          <li class="py-2">Produto adicionado - Margarina - 10 unidades <span class="text-gray-500">(10 minutos atrás)</span></li>
          <li class="py-2">Estoque Atualizado - Biscoito Oreo - -15 unidades <span class="text-gray-500">(25 minutos atrás)</span></li>
          <li class="py-2">Entrega Confirmada - Coca-Cola pedido #447 - 32 itens <span class="text-gray-500">(1 hora atrás)</span></li>
          <li class="py-2">Alerta de Estoque Baixo - Ovos de Galinha Caipira - 2 unidades restantes <span class="text-gray-500">(1 dia atrás)</span></li>
        </ul>
        <button class="mt-4 text-sm text-blue-600 hover:underline">Ver todas as atividades</button>
      </div>

      <div class="bg-yellow-100 p-4 rounded-2xl shadow">
        <h2 class="text-lg font-semibold mb-2">Alerta de Estoque Baixo</h2>
        <p class="text-sm text-gray-600 mb-3">Itens que precisam de reposição</p>
        <ul class="text-sm">
          <li class="flex justify-between border-b py-1">Abacate <span class="text-red-600">1 restando</span></li>
          <li class="flex justify-between border-b py-1">Suco de peroba <span class="text-red-600">2 unidades restando <span class="text-gray-500">(Mínimo: 9)</span></span></li>
          <li class="flex justify-between border-b py-1">Bolacha <span class="text-red-600">4 restando <span class="text-gray-500">(Mínimo: 7)</span></span></li>
        </ul>
        <button class="mt-4 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-lg text-sm">Repor Estoque</button>
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
import { 
  CubeIcon,
  ExclamationIcon,
  TruckIcon,
  ArrowUpIcon,
  PlusIcon,
  PencilIcon
} from "@heroicons/vue/outline";
import { useRouter } from 'vue-router';
import SummaryCard from '../components/ui/Dashboard/SummaryCard.vue';
import ActionCard from '../components/ui/Dashboard/ActionCard.vue';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>

</style>