import { ref } from "vue";

export function useDashboard() {
  const dashboardData = ref({
    stats: {
      totalProducts: "60",
      totalProductsTrend: "+3%",
      lowStockProducts: "10",
      lowStockProductsTrend: "+3",
      pendingDeliveries: "15"
    },
    recentActivity: [
      {
        type: "Produto adicionado",
        description: "Leite 1L",
        value: "10 unidades",
        time: "10 minutos atrás"
      }
    ],
    lowStockAlerts: [
      {
        name: "Laranjas",
        remaining: "2",
        minimum: "15"
      }
    ]
  });

  const fetchDashboardData = async () => {
    try {
      return dashboardData.value;
    } catch (error) {
      console.error("Erro ao carregar dados do painel:", error);
      throw error;
    }
  };

  return {
    dashboardData,
    fetchDashboardData
  };
}