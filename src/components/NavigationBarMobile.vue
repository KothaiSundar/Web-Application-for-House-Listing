<script>
export default {
    name: 'NavigationBarMobile',
    data() {
        return {
            activeHouseImg: require('../assets/images/ic_mobile_navigarion_home_active@3x.png'),
            inactiveHouseImg: require('../assets/images/ic_mobile_navigarion_home@3x.png'),
            activeInfoImg: require('../assets/images/ic_mobile_navigarion_info_active@3x.png'),
            inactiveInfoImg: require('../assets/images/ic_mobile_navigarion_info@3x.png')
        };
    },
    methods: {
        isRouteActive(basePath) {
            return this.$route.path.startsWith(basePath);
        }
    },
};
</script>

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

<style>
.navigation-mobile {
  position: fixed;
  height: 5rem;
  width: 100%;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  z-index: 1000;
}

.navigation-content-mobile {
  position: static;
  height: 5rem;
  width: 100%;
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

.nav-links-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 3rem;
}
.house-mobile,
.info-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 50%;
}

.nav-item-mobile img {
  height: 40px;
  width: 40px;
}

</style>
