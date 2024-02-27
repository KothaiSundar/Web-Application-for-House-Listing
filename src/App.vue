<template>
  <div id="app">
    <NavigationBar />
    <router-view class="view" />
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'; // Adjust the path as necessary

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

/* Add padding-top to make space for the fixed header */
.router-view-enter-active, .router-view-leave-active {
  padding-top: 60px; /* Adjust this value based on your header's height */
}
</style>
