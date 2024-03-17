<template>
  <component :is="componentToRender"></component>
</template>

<script>
// import Houses from "../components/Houses.vue";//desktop component
import Houses from "../components/HousesGen.vue"
// import Houses from "../components/HousesGen";
import HousesMobile from '../components/HousesMobile.vue'; //  mobile component

export default {
  computed: {
    componentToRender() {
      // Use a simple check for screen width to determine device type
      const isMobile = window.innerWidth <= 768;
      return isMobile ? HousesMobile : Houses;
    }
  }
}
</script>