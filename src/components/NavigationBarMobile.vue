<template>
    <nav class="navigation-mobile">
        <div class="navigation-content-mobile">
            <div class="nav-links-mobile header-inactive">
                <div class="house-mobile">
                    <router-link to="/houses" class="nav-item-mobile header-active" exact-active-class="active-link">
                        <img :src="isRouteActive('/house') ? activeHouseImg : inactiveHouseImg" alt="home-icon">
                    </router-link>
                </div>

                <div class="info-mobile">
                    <router-link to="/about" class="nav-item-mobile header-active" exact-active-class="active-link">

                        <img :src="this.$route.path === '/about' ? activeInfoImg : inactiveInfoImg" alt="info-icon">
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBarMobile',
    data() {
        return {
            activeHouseImg: require('./assets/ic_mobile_navigarion_home_active@3x.png'),
            inactiveHouseImg: require('./assets/ic_mobile_navigarion_home@3x.png'),
            activeInfoImg: require('./assets/ic_mobile_navigarion_info_active@3x.png'),
            inactiveInfoImg: require('./assets/ic_mobile_navigarion_info@3x.png')
        };
    },
    methods: {
        isRouteActive(basePath) {
            return this.$route.path.startsWith(basePath);
        }
    },
};
</script>

<style>
@import './assets/styles/navigationMobile.css';
</style>
