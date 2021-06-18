import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/appointments",
  },
  {
    path: "/test",
    component: () => import("@/views/details/patient_details.vue"),
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/appointments",
      },
      {
        path: "appointments",
        component: () => import("@/views/appointments.vue"),
      },
      {
        path: "patients",
        component: () => import("@/views/patients.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
