<template>
    
<nav id =nav>

    <!-- <div> -->
        <img src="../components/assets/img_logo_dtt@3x.png" alt="logo">
        <a href="#">Houses</a>
        <a href="#">About</a>

    <!-- </div> -->
       
</nav>

</template>

<script>

export default{
name:'HomePage'
// component can be anything we can have here homepage

}

</script>

<style>
      
       #nav{
        height: 80px;
        width: 100%;
        background-color: blue;
        display: flex;
        /* justify-content: space-evenly; */
        align-items: center;
        padding-left: 250px;
       }

        #nav img{
            height: 50px;
        }
        #nav a{
            margin-left: 70px;
            font-size: 20px;
            text-decoration: none;
            color: black;
        }




</style>