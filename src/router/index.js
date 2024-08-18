import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PacienteView from "../views/Paciente/PacienteView.vue";
import CitaView from "../views/Cita/CitaView.vue";
import DentistaView from "../views/Dentista/DentistaView.vue";
import TratamientoView from "../views/tratamientos/TratamientoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pacientes",
    name: "pacientes",
    component: PacienteView,
  },
  {
    path: "/dentistas",
    name: "dentistas",
    component: DentistaView,
  },
  {
    path: "/citas",
    name: "citas",
    component: CitaView,
  },
  {
    path: "/tratamientos",
    name: "tratamientos",
    component: TratamientoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
