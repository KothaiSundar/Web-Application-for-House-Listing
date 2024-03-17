<template>
    <div class="houses-icons">
        <img class="icon" src="./assets/ic_bed@3x.png" alt="bed_icon">
        <span>{{ bedrooms }} </span>
        <img class="icon" src="./assets/ic_bath@3x.png" alt="bath_icon">
        <span>{{ bathrooms }} </span>
        <img class="icon" src="./assets/ic_size@3x.png" alt="size_icon">
        <span>{{ size }} m²</span>
    </div>
</template>

<script>
export default {
    name: 'HousesIcons',
    props: {
        bedrooms: Number,
        bathrooms: Number,
        size: Number
    }
};
</script>
<style>
.houses-icons {
    display: flex;
    align-items: center;

    font-family: "Open sans";
    gap: 15px;
}
</style>
