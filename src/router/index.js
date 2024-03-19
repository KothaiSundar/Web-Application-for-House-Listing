import { createRouter, createWebHistory } from "vue-router";
import ResponsiveHouses from "../views/ResponsiveHouses.vue";
import ResponsiveHouseForm from "../views/ResponsiveHouseForm.vue";
import ResponsiveHouseDetails from "../views/ResponsiveHouseDetails.vue";
import About from "../views/About.vue";
import HousesGen from "@/components/HousesGen.vue";
import HouseDetails from "@/components/HouseDetails.vue";
import HouseForm from "@/components/HouseForm.vue";
const routes = [
  { path: "/", redirect: "/houses" },
  // {
  //   name: "Houses",
  //   component: ResponsiveHouses,
  //   path: "/houses",
  // },
  {
    name: "Create",
    component:HouseForm,
    path: "/house/create",
  },
  {
    name: "Edit",
    component: HouseForm,
    path: "/house/edit",
  },
  // {
  //   name: "HouseDetails",
  //   component: ResponsiveHouseDetails,
  //   path: "/houses/:id",
  //   props: (route) => ({ id: Number(route.params.id) }),
  // },

  {
    name: "About",
    component: About,
    path: "/About",
  },
  { name: "HousesGen", component: HousesGen, path: "/houses" },

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
