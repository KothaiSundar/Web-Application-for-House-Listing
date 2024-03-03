<template>
    <nav class="navigation-mobile">
        <div class="navigation-content-mobile">

         

            <div class="nav-links-mobile header-inactive">

           <div class="house-mobile">
            
           
                <router-link to="/houses" class="nav-item-mobile header-active" exact-active-class="active-link">
                   
                    <img src="./assets/ic_mobile_navigarion_home_active@3x.png" alt="home-icon">
              
                </router-link>
            </div>


            <div class="info-mobile">
                    <router-link to="/about" class="nav-item-mobile header-active" exact-active-class="active-link">
                   
                        <img src="./assets/ic_mobile_navigarion_info@3x.png" alt="home-icon">
                   
                </router-link>
            </div>
              
                
               
            </div> 

        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavigationBarMobile',
    mounted() {
        // window.alert('NavigationBarMobile');
    }
};
</script>

<style scoped>
@import './assets/styles/navigationMobile.css';
</style>
