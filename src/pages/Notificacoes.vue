<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Cards estatísticos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-blue-100 p-6 rounded-2xl flex justify-between items-center"
      >
        <div>
          <h3 class="font-semibold">Notificações Não Lidas</h3>
          <p class="text-2xl font-bold">{{ unreadCount }}</p>
        </div>
        <TruckIcon class="h-8 w-8" />
      </div>

      <div
        class="bg-green-100 p-6 rounded-2xl flex justify-between items-center"
      >
        <div>
          <h3 class="font-semibold">Previstas para Hoje</h3>
          <p class="text-2xl font-bold">1</p>
        </div>
        <CalendarIcon class="h-8 w-8" />
      </div>

      <div
        class="bg-purple-100 p-6 rounded-2xl flex justify-between items-center"
      >
        <div>
          <h3 class="font-semibold">Entregas nessa Semana</h3>
          <p class="text-2xl font-bold">5</p>
        </div>
        <CubeIcon class="h-8 w-8" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <!-- Filtros -->
        <div class="mb-6">
          <div class="flex space-x-2">
            <button
              v-for="filter in filters"
              :key="filter.name"
              @click="currentFilter = filter.value"
              class="px-4 py-2 rounded-lg text-sm"
              :class="
                currentFilter === filter.value
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100'
              "
            >
              {{ filter.name }}
            </button>
          </div>
        </div>

        <!-- Lista de notificações -->
        <div class="bg-white rounded-xl shadow">
          <div
            class="p-4 border-b border-gray-100 flex justify-between items-center"
          >
            <h2 class="font-semibold">Todas as Notificações</h2>
            <button
              @click="markAllAsRead"
              class="text-sm text-purple-600 hover:text-purple-800"
            >
              Marcar todas como lidas
            </button>
          </div>
          <div class="divide-y">
            <div
              v-for="notification in filteredNotifications"
              :key="notification.id"
              class="p-4 hover:bg-gray-50 relative group"
              :class="{
                'bg-purple-50': !notification.read,
                'opacity-75': notification.read,
              }"
            >
              <div
                v-if="!notification.read"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-purple-500 rounded-r"
              ></div>

              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-3">
                  <div
                    class="p-2 rounded-full"
                    :class="{
                      'bg-yellow-100': notification.type === 'baixo-estoque',
                      'bg-red-100': notification.type === 'validade',
                      'bg-green-100': notification.type === 'entrega',
                    }"
                  >
                    <component
                      :is="getNotificationIcon(notification.type)"
                      class="h-5 w-5"
                      :class="{
                        'text-yellow-600':
                          notification.type === 'baixo-estoque',
                        'text-red-600': notification.type === 'validade',
                        'text-green-600': notification.type === 'entrega',
                      }"
                    />
                  </div>
                  <div>
                    <p
                      class="font-medium"
                      :class="
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      "
                    >
                      {{ notification.title }}
                    </p>
                    <p
                      class="text-sm"
                      :class="
                        !notification.read ? 'text-gray-600' : 'text-gray-500'
                      "
                    >
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ notification.date }}
                    </p>
                  </div>
                </div>

                <button
                  v-if="!notification.read"
                  @click="markAsRead(notification.id)"
                  class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-100 rounded-full"
                  title="Marcar como lida"
                >
                  <CheckIcon class="h-5 w-5 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow p-6 h-fit">
        <div class="mb-6">
          <h3 class="text-lg font-semibold">Configuração das Notificações</h3>
        </div>

        <div class="space-y-6">
          <!-- Tipos de notificações -->
          <div>
            <h4 class="font-medium mb-4">Tipos de notificações</h4>
            <div class="space-y-4">
              <div
                v-for="type in notificationTypes"
                :key="type.name"
                class="flex items-center justify-between"
              >
                <span class="text-gray-700">{{ type.name }}</span>
                <button
                  class="w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out"
                  :class="type.enabled ? 'bg-purple-600' : 'bg-gray-200'"
                  @click="type.enabled = !type.enabled"
                >
                  <div
                    class="w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out"
                    :class="type.enabled ? 'transform translate-x-6' : ''"
                  ></div>
                </button>
              </div>
            </div>
          </div>

          <!-- Configuração de Validade/Baixo Estoque -->
          <div>
            <h4 class="font-medium mb-4">
              Configuração de Validade/Baixo Estoque
            </h4>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="text-gray-700 mr-4">Limite Mínimo de Estoque</span>
                <select class="border rounded-md px-2 py-1">
                  <option>10%</option>
                  <option>15%</option>
                  <option>25%</option>
                </select>
              </div>
              <div class="flex items-center">
                <span class="text-gray-700 mr-4"
                  >Alerta de antes da validade expirar</span
                >
                <select class="border rounded-md px-2 py-1">
                  <option>3 dias</option>
                  <option>5 dias</option>
                  <option>7 dias</option>
                </select>
              </div>
            </div>
          </div>

          <button
            class="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  TruckIcon,
  CalendarIcon,
  CubeIcon,
  ExclamationIcon,
  ClockIcon,
  CheckCircleIcon,
  CheckIcon, 
} from "@heroicons/vue/outline";
import { useNotifications } from "@/composables/useNotifications";

const { notifications, unreadCount, markAllAsRead, clearAll, markAsRead } =
  useNotifications();

const currentFilter = ref("all");

const filters = [
  { name: "Tudo", value: "all" },
  { name: "Baixo Estoque", value: "baixo-estoque" },
  { name: "Entregas", value: "entrega" },
  { name: "Validade", value: "validade" },
];

const notificationTypes = ref([
  { name: "Alerta de baixo Estoque", enabled: true },
  { name: "Atualizações de Entrega", enabled: true },
  { name: "Alerta Validade", enabled: true },
]);

const filteredNotifications = computed(() => {
  if (currentFilter.value === "all") return notifications.value;
  return notifications.value.filter((n) => n.type === currentFilter.value);
});

const getNotificationIcon = (type) => {
  const icons = {
    "baixo-estoque": ExclamationIcon,
    validade: ClockIcon,
    entrega: CheckCircleIcon,
  };
  return icons[type];
};
</script>