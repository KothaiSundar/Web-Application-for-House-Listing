<template>
    <nav class="navigation">
        <div class="navigation-content">
            <div class="logo">
                <img src="./assets/img_logo_dtt@3x.png" alt="DTT Logo" /> <!-- Update with your logo's path -->
            </div>
            <div class="nav-links header-inactive">
                <router-link to="/houses" class="nav-item header-active"
                    :class="{ 'active-link': isRouteActive('/house') }">
                    Houses
                </router-link>
                <router-link to="/about" class="nav-item header-active" active-class="active-link">
                    About
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBar',
    methods: {
        isRouteActive(basePath) {
            return this.$route.path.startsWith(basePath);
        }
    },
};
</script>

<style>
@import './assets/styles/navigation.css';
</style>
