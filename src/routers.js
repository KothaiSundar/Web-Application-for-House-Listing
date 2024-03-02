import Home from "./components/Home.vue";
import Houses from "./components/Houses.vue"; // Your houses component
// import Houses from "./components/Houses_github.vue"; // Your houses component

import About from "./components/About.vue"; // Your about component
import HouseDetails from "./components/HouseDetails.vue"; // Your about component
import HouseFrom from "./components/HouseForm.vue"; // Your houses component
import Delete from "./components/Delete.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/home",
  },
  {
    name: "Houses",
    component: Houses,
    path: "/houses",
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
  {
    path: "/houseform",
    name: "HouseForm",
    component: HouseFrom,
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
