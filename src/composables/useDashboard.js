import { ref, onMounted, onUnmounted } from "vue";

export function useDashboard() {
  const dashboardStats = ref({
    totalProducts: 0,
    lowStockProducts: 0,
    pendingDeliveries: 0,
    productOutput: 0,
    totalProductsTrend: "",
    lowStockProductsTrend: "",
    pendingDeliveriesTrend: "",
    productOutputTrend: "",
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      const data = await response.json();
      updateStats(data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    }
  };

  const updateStats = (data) => {
    dashboardStats.value = {
      totalProducts: data.totalProducts,
      lowStockProducts: data.lowStockProducts,
      pendingDeliveries: data.pendingDeliveries,
      productOutput: data.productOutput,
      totalProductsTrend: data.totalProductsTrend,
      lowStockProductsTrend: data.lowStockProductsTrend,
      pendingDeliveriesTrend: data.pendingDeliveriesTrend,
      productOutputTrend: data.productOutputTrend,
    };
  };

  // Conexão WebSocket para atualização em tempo real WebSocket
  let ws = null;

  const initializeWebSocket = () => {
    ws = new WebSocket("seu_websocket_url");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "DASHBOARD_STATS_UPDATE") {
        updateStats(data);
      }
    };

    ws.onclose = () => {
      // Tenta reconectar após 5 segundos
      setTimeout(initializeWebSocket, 5000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  onMounted(() => {
    fetchDashboardStats();
    initializeWebSocket();
  });

  onUnmounted(() => {
    if (ws) ws.close();
  });

  return {
    dashboardStats,
    fetchDashboardStats,
  };
}