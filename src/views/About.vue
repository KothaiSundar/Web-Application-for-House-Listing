<template>
  <div class="about-page">
    <section class="about-section layout">
      <h1>
        <div class="mobile-only">
          About
        </div>
      </h1>
      <h1>About DTT Real Estate</h1>
      <div class="about-para">
        <p class="body-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p class="body-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div><br>

      <h1>Design and Development</h1>

      <div class="about-info">
        <aside class="about-logo">
          <img src="../assets/images/img_logo_dtt@3x.png" alt="DTT Logo" />
        </aside>
        <aside class="about-text body-text">
          <p id="dtt">By DTT</p>
          <p><a href="http://www.d-tt.nl" target="_blank">www.d-tt.nl</a></p>
        </aside>
      </div>

    </section><!-- about-section layout ends -->

  </div><!-- about-page ends -->

</template>

<script>
export default {
  name: 'About',
  inheritAttrs: false
};
</script>

<style scoped>
/* desktop view */
.about-page {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  background-color: rgb(246, 246, 246);
  height: 100vh;
}

.mobile-only {
  display: none;
}

.about-section {
  padding-top: 3rem;
  text-align: justify;
}

.about-para p {
  line-height: 2;
  width: inherit;
  margin-top: 1rem;
}

.about-section h1,
.about-section h2 {
  text-align: left;
}

.about-info {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.about-logo img {
  margin-right: 3rem;
  height: 5rem;
  width: 16rem;
}

.about-text {
  line-height: 0.2;
}

.about-text a {
  text-decoration: none;
}

/* Media query for mobile screens */
@media screen and (max-width: 768px) {
  .about-page {
    margin: 0;
  }

  .mobile-only {
    text-align: center;
    padding-bottom: 2rem;
    display: block;
  }

  .layout {
    max-width:90%;
    margin-top: 0;
    padding: 10px;
  }

  .about-section {
    padding-top: 2rem;
   
  }

  .about-para p {
    line-height: 1rem;
   
  }

  .about-info {
  
    margin-top: 1rem;
    padding: auto;
  }

  .about-logo img {
    margin-right: 2rem;
    height: 2rem;
    width: 5rem;
  }
}
@media screen and (max-width: 300px) {
  .about-page{
    min-width:300px;
 
  }
 
.about-logo img {
    margin-right: 2rem;
    height: 2rem;
    width: 3rem;
  }
  
  }
</style>
