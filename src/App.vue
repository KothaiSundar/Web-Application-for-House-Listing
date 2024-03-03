<template>
  <div id="app">
    <NavigationBar />
    <router-view class="view" />
  </div>
</template>

<script>

import NavigationBar from './components/NavigationBar.vue'; 

export default {
  name: 'App',
  components: {
    NavigationBar
  },
}

</script>

