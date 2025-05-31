<template>
  <header class="bg-white border-b border-gray-200 h-16 flex items-center px-6">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <div class="flex items-center ml-auto">
      <div class="relative mr-4">
        <input
          type="text"
          placeholder="Pesquisar"
          class="bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-300 w-64"
        />
        <SearchIcon class="h-5 w-5 text-gray-500 absolute left-3 top-2.5" />
      </div>

      <button class="relative mr-4">
        <BellIcon class="h-6 w-6 text-gray-600" />
        <span
          v-if="hasNotifications"
          class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
        ></span>
      </button>

      <button @click="handleLogout" class="text-gray-600 hover:text-gray-800">
        <LogoutIcon class="h-6 w-6" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SearchIcon, BellIcon, LogoutIcon } from "@heroicons/vue/outline";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const router = useRouter();
const { logout } = useAuth();
const hasNotifications = ref(true);

const title = computed(() => {
  return route.meta.title || "Dashboard";
});

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>
