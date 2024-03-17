<template>
  <div id="app">
    <NavigationBar v-if="!mobileView" />
    <NavigationBarMobile v-if="mobileView" />
    <router-view class="view" />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import NavigationBarMobile from "./components/NavigationBarMobile.vue";

export default {
  name: 'App',
  components: {
    NavigationBar,
    NavigationBarMobile
  },
  data() {
    return {
      mobileView: false,
      showNav: false
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 768;
    }
  },
  mounted() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleView);
  }

};
</script>

<style scoped>
@import './components/assets/styles/styles.css';
@import './components/assets/styles/mobile.css';
</style>