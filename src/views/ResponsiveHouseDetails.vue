<template>
    <component :is="componentToRender"></component>
</template>

<script>
import HouseDetails from '../components/HouseDetails.vue'; //desktop component
import HouseDetailsMobile from '../components/HouseDetailsMobile.vue'; //  mobile component

export default {
    computed: {
        componentToRender() {
            const isMobile = window.innerWidth <= 768;
            return isMobile ? HouseDetailsMobile : HouseDetails;
        }
    }
}
</script>