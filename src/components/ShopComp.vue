<template>
  <div class="container">
    <div class="shop-section">
      <div class="text-sec">
        <div class="text">
          <h2>Shop Now</h2>
        </div> 
      </div>
      <div class="image">
        <img :src='backgroundImg' alt='Image'>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      backgroundImg: 'https://i.pinimg.com/736x/29/6c/93/296c93f3bd54c365485ea1e1ec3cb8d0.jpg'
    }
  },
}
</script>
<style>
  .container {
    min-width: 100%;
  }
  .shop-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    justify-content: center;
    align-items: center;
    width: clamp(20em, 100vw, 100%);
  }
  .text-sec {
    background-color: orangered;
    height: 99%;
    display: flex;
    align-items: center;
  }
  .text {
    margin: 4em 0 0 4em;
    width: clamp(5em, 100vw, 40em);
  }
  .text h2 {
    text-align: left;
    font-size: 270%;
    color: white;
  }
  .image img {
    width: clamp(20em, 100vw, 100%);
    height: 100%;
  }

  @media only screen and (min-width: 301px) and (max-width: 640px) {
    .image img, .text-sec {
      min-width: 43em;
    }
  }

  @media only screen and (max-width: 300px) {
    .shop-section {
      margin-left: 2em;
    }
    .image img, .text-sec {
      min-width: 40em;
    }
  }
</style>