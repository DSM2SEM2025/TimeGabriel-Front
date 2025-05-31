<template>
    <div class="flex h-screen">
      <Sidebar />
      <div class="ml-64 flex-1 flex flex-col">
        <Navbar />
        <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
  <router-view />
        </main>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import Sidebar from '@/components/layout/Sidebar.vue';
  import Navbar from '@/components/layout/Navbar.vue';
  </script>