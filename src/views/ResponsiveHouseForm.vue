<template>
  <component :is="componentToRender"></component>
</template>

<script>
import HouseForm from "../components/HouseForm.vue"//desktop component
import HouseFormMobile from '../components/HouseFormMobile.vue'; //  mobile component

export default {
  computed: {
    componentToRender() {
      const isMobile = window.innerWidth <= 768;
      return isMobile ? HouseFormMobile : HouseForm;
    }
  }
}
</script>