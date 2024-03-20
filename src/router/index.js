import { createRouter, createWebHistory } from "vue-router";
import About from "@/views/About.vue";
import HousesList from "@/views/HousesList.vue";
import HouseDetails from "@/views/HouseDetails.vue";
import HouseForm from "@/views/HouseForm.vue";
const routes = [
  { path: "/", redirect: "/houses" },

  {
    name: "Create",
    component: HouseForm,
    path: "/house/create",
  },
  {
    name: "Edit",
    component: HouseForm,
    path: "/house/edit",
  },
  {
    name: "About",
    component: About,
    path: "/About",
  },
  { name: "HousesList", 
  component: HousesList,
  path: "/houses" },

  {
    name: "HouseDetails",
    component: HouseDetails,
    path: "/houses/:id",
    props: (route) => ({ id: Number(route.params.id) }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
