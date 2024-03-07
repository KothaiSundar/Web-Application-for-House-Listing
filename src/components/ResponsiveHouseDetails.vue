<template>
    <component :is="componentToRender"></component>
</template>

<script>
import HouseDetails from './HouseDetails.vue'; //desktop component
import HouseDetailsMobile from './HouseDetailsMobile.vue'; //  mobile component

export default {
    computed: {
        componentToRender() {
            // Use a simple check for screen width to determine device type
            const isMobile = window.innerWidth < 768;
            return isMobile ? HouseDetailsMobile : HouseDetails;
        }
    }
}
</script>