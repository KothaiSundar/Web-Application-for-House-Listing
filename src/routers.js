import About from "./components/About.vue";
import HouseDetails from "./components/HouseDetails.vue";

import Delete from "./components/Delete.vue";
import { createRouter, createWebHistory } from "vue-router";
import ResponsiveHouses from "./components/ResponsiveHouses.vue";
import ResponsiveHouseForm from "./components/ResponsiveHouseForm.vue";

const routes = [
  { path: "/", redirect: "/houses" },
  {
    name: "Houses",
    component: ResponsiveHouses,
    path: "/houses",
  },
  {
    name: "HouseForm",
    component: ResponsiveHouseForm,
    path: "/houseForm",
  },

  {
    name: "About",
    component: About,
    path: "/about",
  },
  {
    path: "/houses/:id",
    name: "HouseDetails",
    component: HouseDetails,
  },
  // {
  //   path: "/houseform",
  //   name: "HouseForm",
  //   component: HouseFrom,
  // },
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
