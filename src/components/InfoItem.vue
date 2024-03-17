<template>
    <div>
        <img class="icon" :src="iconSrc" :alt="iconAlt">
        <span>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'InfoItem',
    props: {
        iconSrc: String,
        iconAlt: String,
        text: String
    }
};
</script>

<style>
.info-item {
    display: flex;
    align-items: center;
    /* Add more styling as needed */
}

.icon {
    /* Add styling for the icon */
}
</style>