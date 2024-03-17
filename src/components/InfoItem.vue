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
