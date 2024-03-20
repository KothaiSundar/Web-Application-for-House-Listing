<script>
export default {
    name: 'InfoItem',
    props: {
        iconSrc: String,
        iconAlt: String,
        text: String
    },
    computed: {
        resolvedIconSrc() {
            return require(`@/assets/images/${this.iconSrc}`);
        }
    }
};
</script>
<template>
    <img class="icon" :src="resolvedIconSrc" :alt="iconAlt">
    <span>{{ text }}</span>
</template>
