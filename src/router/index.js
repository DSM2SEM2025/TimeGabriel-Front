import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        redirect: "/dashboard"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/Dashboard.vue"),
        meta: { title: "Dashboard" }
      },
      {
        path: "/produtos",
        name: "produtos",
        component: () => import("@/pages/Produtos.vue"),
        meta: { title: "Produtos" }
      },
      {
        path: "/estoque",
        name: "estoque",
        component: () => import("@/pages/Estoque.vue"),
        meta: { title: "Estoque" }
      },
      {
        path: "/checkout",
        name: "checkout",
        component: () => import("@/pages/Checkout.vue"),
        meta: { title: "Checkout" }
      },
      {
        path: "/entregas",
        name: "entregas",
        component: () => import("@/pages/Entregas.vue"),
        meta: { title: "Entregas" }
      },
      {
        path: "/notificacoes",
        name: "notificacoes",
        component: () => import("@/pages/Notificacoes.vue"),
        meta: { title: "Notificações" }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/pages/Login.vue")
  },
  {
    path: "/esqueci-senha",
    component: () => import("@/pages/EsqueciSenha.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
