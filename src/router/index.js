import { createRouter, createWebHistory } from "vue-router";
import ResponsiveHouses from "../views/ResponsiveHouses.vue";
import ResponsiveHouseForm from "../views/ResponsiveHouseForm.vue";
import ResponsiveHouseDetails from "../views/ResponsiveHouseDetails.vue";
import About from "../views/About.vue";
import HousesGen from "@/components/HousesGen.vue";
const routes = [
  { path: "/", redirect: "/houses" },
  // {
  //   name: "Houses",
  //   component: ResponsiveHouses,
  //   path: "/houses",
  // },
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
  {name:"HousesGen",
  component:HousesGen,
  path: "/houses"


  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
