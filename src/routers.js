import Delete from "./components/Delete.vue";
import { createRouter, createWebHistory } from "vue-router";
import ResponsiveHouses from "./components/ResponsiveHouses.vue";
import ResponsiveHouseForm from "./components/ResponsiveHouseForm.vue";
import ResponsiveHouseDetails from "./components/ResponsiveHouseDetails.vue";
import About from "./components/About.vue";
const routes = [
  { path: "/", redirect: "/houses" },
  {
    name: "Houses",
    component: ResponsiveHouses,
    path: "/houses",
  },
  {
    name: "Create",
    component: ResponsiveHouseForm,
    path: "/house/create",
  },
  {
    name: "Edit",
    component: ResponsiveHouseForm,
    path: "/house/edit",
  },
  {
    name: "HouseDetails",
    component: ResponsiveHouseDetails,
    path: "/houses/:id",
    props: (route) => ({ id: Number(route.params.id) }),
  },

  {
    name: "About",
    component: About,
    path: "/About",
  },
  {
    path: "/delete",
    name: "Delete",
    component: Delete,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
