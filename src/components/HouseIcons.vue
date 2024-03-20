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

<template>
    <div class="houses-icons">
        <img class="icon" src="../assets/images/ic_bed@3x.png" alt="bed_icon">
        <span>{{ bedrooms }} </span>
        <img class="icon" src="../assets/images/ic_bath@3x.png" alt="bath_icon">
        <span>{{ bathrooms }} </span>
        <img class="icon" src="../assets/images/ic_size@3x.png" alt="size_icon">
        <span>{{ size }} m²</span>
    </div>
</template>


<style>
.houses-icons {
    display: flex;
    align-items: center;
     font-family: "Open sans";
    gap: 15px;
}

@media screen and (max-width: 540px) {
    .houses-icons {
   padding-top: 10px;
  
}

}
</style>
