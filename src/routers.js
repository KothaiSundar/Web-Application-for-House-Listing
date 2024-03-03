
import Houses from "./components/Houses.vue";
import About from "./components/About.vue"; 
import HouseDetails from "./components/HouseDetails.vue";
import HouseFrom from "./components/HouseForm.vue"; 
import Delete from "./components/Delete.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/houses" },
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
