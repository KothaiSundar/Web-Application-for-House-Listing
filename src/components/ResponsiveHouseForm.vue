<template>
  <component :is="componentToRender"></component>
</template>

<script>
import HouseForm from "./HouseForm.vue"
//desktop component

import HouseFormMobile from './HouseFormMobile.vue'; //  mobile component

export default {
  computed: {
    componentToRender() {
      // Use a simple check for screen width to determine device type

      const isMobile = window.innerWidth < 768;
      return isMobile ? HouseFormMobile : HouseForm;


    }
  }
}
</script>