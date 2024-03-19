<script>
export default {
    name: 'NavigationBar',
    methods: {
        isRouteActive(basePath) {
            return this.$route.path.startsWith(basePath);
        }
    },
    // data() {
    //     return {
    //         activeHouseImg: require('./assets/ic_mobile_navigarion_home_active@3x.png'),
    //         inactiveHouseImg: require('./assets/ic_mobile_navigarion_home@3x.png'),
    //         activeInfoImg: require('./assets/ic_mobile_navigarion_info_active@3x.png'),
    //         inactiveInfoImg: require('./assets/ic_mobile_navigarion_info@3x.png')
    //     };
    // }
};
</script>

<template>
    <nav class="navigation">
        <div class="navigation-content layout">
            <div class="navigation-content-desktop">
                
          
            <div class="logo">
                <img src="./assets/img_logo_dtt@3x.png" alt="DTT Logo" /> <!-- Update with your logo's path -->
            </div>
            <div class="nav-links header-inactive">
                <router-link to="/houses" class="nav-item header-active"
                    :class="{ 'active-link': isRouteActive('/house') }">
                    <h2>Houses</h2>
                </router-link>
                <router-link to="/about" class="nav-item header-active" active-class="active-link">
                    <h2>About</h2>
                </router-link>
            </div>
        </div>
        <!-- <div class="nav-links-mobile header-inactive">
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
            </div> -->
        </div>
    </nav>
</template>

<style>
/* @import './assets/styles/navigation.css'; */
.navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 255, 255);
    z-index: 100;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-links-mobile{
    display: none;
}
.navigation-content {
    width: 100%; 
}
.navigation-content-desktop {
    width: 100%;
    display: flex;
    align-items: center;
}

.logo img {
    height: 3rem;
}

.nav-links {
    display: flex;
    align-items: center;
    color: rgb(246, 246, 246);
}

.nav-links,
.nav-item {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    color: rgb(232, 232, 232);
}

.nav-links .active-link {
    color: rgb(0, 0, 0);
}

/* @media screen and (max-width: 768px) {

.navigation {
  position: fixed;
  height: 5rem;
  width: 100%;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  z-index: 1000;
}
    .navigation-content-desktop{
        display: none;
    }


} */
</style>
