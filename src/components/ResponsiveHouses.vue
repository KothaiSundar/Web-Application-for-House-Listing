<template>
    <component :is="componentToRender"></component>
  </template>
  
  <script>
import Houses from "./Houses.vue";
  // Assume this is your desktop component
  import HousesMobile from './HousesMobile.vue'; // Assume this is your mobile component
  
  export default {
    computed: {
      componentToRender() {
        // Use a simple check for screen width to determine device type
        // You can replace this with a more sophisticated check if needed
        const isMobile = window.innerWidth < 768; // Example breakpoint for mobile
        return isMobile ? HousesMobile : Houses;
      }
    }
  }
  </script>
  