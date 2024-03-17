<template>
  <component :is="componentToRender"></component>
</template>

<script>
import Houses from "../components/Houses.vue";//desktop component
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